'use client'

import { useMemo, useState } from 'react'
import * as d3 from 'd3';

import { BarTimeSeriesProps, TextAnchor, TimeSeriesResult, xPeriodMidpoint } from '../../lib/types'

import Tooltip from './Tooltip';

const dayGrainYearMonthLabelMaxDays = 62;
const weekGrainYearMonthLabelMaxDays = 183;
const millisecondsPerDay = 24 * 60 * 60 * 1000;

function simpleMovingAverage(values: number[], window: number) {
    if (!values || values.length < window) {
        return [];
    }
    let index = window - 1;
    const length = values.length + 1;
    const simpleMovingAverages = [];
    while (++index < length) {
        const windowSlice = values.slice(index - window, index);
        const sum = windowSlice.reduce((prev, curr) => prev + curr, 0);
        simpleMovingAverages.push(sum / window);
    }

    return simpleMovingAverages;
  }

const BarTimeSeries: React.FC<BarTimeSeriesProps> = ({
    data = [],
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 40,
    marginBottom = 40,
    marginLeft = 40,
    dateRange = [],
    xGrain = 'Weeks',
    useMovingAverage = false,
    movingAverageWindow = 7
}) => {
    const [isDarkScheme, setIsDarkScheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false);

    // Conditional styling for all ticks and labels
    const theme = isDarkScheme ? 'dark' : 'light';
    const strokeColor = theme === 'dark' ? 'white' : 'black';
    const fillColor = theme === 'dark' ? 'white' : 'black';
    const ticksStyle = {
        fill: fillColor,
        font: '11px Arial',
    };
    const xLabelsStyle = {
        textAnchor: 'middle' as TextAnchor,
        font: '11px Arial',
        fill: fillColor,
    }
    const yLabelsStyle = {
        textAnchor: 'end' as TextAnchor,
        font: '11px Arial',
        fill: fillColor,
    }

    const [hoveredData, setHoveredData] = useState<TimeSeriesResult | null>(null);
    const [plotData, xPeriodMidpoints, xLabsFormatSpec] = useMemo(() => {
        if (dateRange.length != 2) {
            return [[], [], d3.timeFormat('%Y')];
        }
        dateRange[0].setHours(0, 0, 0, 0);
        dateRange[1].setHours(23, 59, 59, 999);

        // Filter data by date range
        const today = new Date();
        const maxDate = d3.max(data, d => d.date);
        const missingToDate = d3.timeDays(maxDate!, today);
        const missingData = missingToDate.map(date => ({ date, value: 0 }));
        data = data.concat(missingData);
        data = data.filter(d => d.date >= dateRange[0] && d.date <= dateRange[1]);

        // if there's no data, return early
        if (data.length === 0) {
            return [[], [], d3.timeFormat('%Y')];
        }

        const dateGrainMap = {
            'Days': (x: Date) => new Date(x.getFullYear(), x.getMonth(), x.getDate(), 12),
            // midways through the week, so midday Wednesday
            'Weeks': (x: Date) => {
                const wednesdayBefore = d3.timeWednesday.floor(x);
                const wednesdayAfter = d3.timeWednesday.ceil(x);
                if ((x.getTime() - wednesdayBefore.getTime()) < (wednesdayAfter.getTime() - x.getTime())) {
                    return new Date(wednesdayBefore.setHours(12, 0, 0, 0));
                } else {
                    return new Date(wednesdayAfter.setHours(12, 0, 0, 0));
                }
            },
            'Months': (x: Date) => new Date(d3.timeMonth(x).setDate(15)),
            'Years': (x: Date) => new Date(x.getFullYear(), 6, 1),
        };
        const dateGrainFunc = dateGrainMap[xGrain];
        // rollup data by date grain to get sum of values for each grain
        const rollup = d3.rollups(data, v => d3.sum(v, d => d.value), d => dateGrainFunc(d.date));
        let agg_data = rollup.map(([date, value]) => ({ date, value }));

        // handle moving average
        if (useMovingAverage) {
            const values = agg_data.map(d => d.value);
            const means = simpleMovingAverage(values, movingAverageWindow);
            agg_data = agg_data.map((d, i) => ({ ...d, value: means[i] }));
        }

        // filter out any null values (e.g. from moving average calculations)
        agg_data = agg_data.filter(d => !isNaN(d.value));

        // Set up xTicks based on xGrain and dateRange
        const dateRangeDiff = dateRange[1].getTime() - dateRange[0].getTime();
        let xLabsFormatSpec = '%m/%d';
        let xLabsFormat = d3.timeFormat('%m/%d');
        switch (xGrain) {
            case 'Days':
                if (dateRangeDiff <= 7 * millisecondsPerDay) { // 7 days
                    xLabsFormatSpec = '%a';
                    xLabsFormat = d3.timeFormat(xLabsFormatSpec);
                } else if (dateRangeDiff <= dayGrainYearMonthLabelMaxDays * millisecondsPerDay) { // dayGrainYearMonthLabelMaxDays days
                    xLabsFormatSpec = '%m/%d';
                    xLabsFormat = d3.timeFormat('%m/%d');
                } else if (dateRangeDiff <= 2 * 365 * millisecondsPerDay) { // 2 years
                    xLabsFormatSpec = '%b';
                    xLabsFormat = d3.timeFormat(xLabsFormatSpec);
                } else {
                    xLabsFormatSpec = '%Y';
                    xLabsFormat = d3.timeFormat(xLabsFormatSpec);
                }
                break;
            case 'Weeks':
                if (dateRangeDiff <= weekGrainYearMonthLabelMaxDays * millisecondsPerDay) { // weekGrainYearMonthLabelMaxDays days
                    xLabsFormatSpec = '%m/%d';
                    xLabsFormat = d3.timeFormat(xLabsFormatSpec);
                } else if (dateRangeDiff <= 2 * 365 * millisecondsPerDay) { // 2 years
                    xLabsFormatSpec = '%b';
                    xLabsFormat = d3.timeFormat(xLabsFormatSpec);
                } else {
                    xLabsFormatSpec = '%Y';
                    xLabsFormat = d3.timeFormat(xLabsFormatSpec);
                }
                break;
            case 'Months':
                if (dateRangeDiff <= 2 * 365 * millisecondsPerDay) { // 2 years
                    xLabsFormatSpec = '%b';
                    xLabsFormat = d3.timeFormat('%b');
                } else {
                    xLabsFormatSpec = '%Y';
                    xLabsFormat = d3.timeFormat(xLabsFormatSpec);
                }
                break;
            case 'Years':
                xLabsFormatSpec = '%Y';
                xLabsFormat = d3.timeFormat(xLabsFormatSpec);
                break;
            default:
                xLabsFormatSpec = '%m/%d';
                xLabsFormat = d3.timeFormat(xLabsFormatSpec);
        }

        const xTicksArray = new Map();
        agg_data.forEach(d => {
            const original = d.date.getTime();
            const formatted = xLabsFormat(d.date);
            xTicksArray.set(original, formatted);
        });
        // Loop through xTicksArray and for each period present, generate a midpoint map in addition to the original map.
        // Midpoint is the middle of the period shown by formatted date. For example, if the original is 3rd of January, 2022, the formatted date 'Jan', then the midpoint is 15th of January, 2022. If formatted date is '2023', the midpoint is 1st of July 2023, etc.
        const xPeriodMidpoints: xPeriodMidpoint[] = [];
        xTicksArray.forEach((value, key) => {
            const date = new Date(key);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = new Date(year, month, date.getDate()).getTime();
            const mondayOfTheWeek = d3.timeMonday(date);
            const weekStart = mondayOfTheWeek.getTime();
            const weekMidpoint = new Date(mondayOfTheWeek.getFullYear(), mondayOfTheWeek.getMonth(), mondayOfTheWeek.getDate() + 2).setHours(12);
            const monthStart = new Date(year, month, 1).getTime();
            const monthMidpoint = new Date(year, month, 15).getTime();
            const yearStart = new Date(year, 0, 1).getTime();
            const yearMidpoint = new Date(year, 6, 1).getTime();
            
            let midpoint = 0;
            let altLabel = null;
            switch (xGrain) {
                case 'Days':
                    if (dateRangeDiff <= 14 * millisecondsPerDay) { // 14 days
                        midpoint = key;
                    } else if (dateRangeDiff <= dayGrainYearMonthLabelMaxDays * millisecondsPerDay) { // dayGrainYearMonthLabelMaxDays days
                        midpoint = weekStart;
                        altLabel = d3.timeFormat('%m/%d')(new Date(weekStart));
                    } else if (dateRangeDiff <= 2 * 365 * millisecondsPerDay) { // 2 years
                        midpoint = monthStart;
                    } else {
                        midpoint = yearStart;
                    }
                    break;
                case 'Weeks':
                    if (dateRangeDiff <= dayGrainYearMonthLabelMaxDays * millisecondsPerDay) { // dayGrainYearMonthLabelMaxDays days
                        midpoint = weekMidpoint;
                        altLabel = d3.timeFormat('%m/%d')(new Date(weekStart));
                    } else if (dateRangeDiff <= 2 * 365 * millisecondsPerDay) { // 2 years
                        midpoint = monthStart;
                    } else {
                        midpoint = yearStart;
                    }
                    break;
                case 'Months':
                    if (dateRangeDiff <= 2 * 365 * millisecondsPerDay) { // 2 years
                        midpoint = monthMidpoint;
                    } else {
                        midpoint = yearStart;
                    }
                    break;
                case 'Years':
                    midpoint = yearMidpoint;
                    break;
                default:
                    midpoint = yearMidpoint;
            }
            // IFF the midpoint is not already in the array, add it to the array.
            if (!xPeriodMidpoints.some(d => d.midpoint === midpoint)) {
                xPeriodMidpoints.push({original: key, midpoint: midpoint, formatted: value, altLabel: altLabel});
            }
        });

        return [agg_data, xPeriodMidpoints, xLabsFormatSpec];
    }, [data, dateRange, xGrain, useMovingAverage, movingAverageWindow]);

    // Create scales
    // Let there be B bars, defined by the length of plotData
    // There then need to be B bins, and B+1 xTicks.
    // Let the total width of the chart (excluding margins) be W
    // The distance between each xTick should be W / B.
    // The width of each bar should be W / B * 3/4.
    // The left edge of the first bar should be at W / B / 8.
    // The left edge of the second bar should be at W / B + W / B / 8, and so on.
    const B = plotData.length;
    const W = width - marginLeft - marginRight;
    const binWidth = W / B;
    const barWidth = W / B * 3 / 4;

    const y = d3.scaleLinear()
        .domain([0, d3.max(plotData, d => d.value) || 0])
        .range([height - marginBottom, marginTop]);
    
    // Create bars
    let outlineWidth = 0.2;
    if (plotData.length < 200) {
        outlineWidth = 0.1;
    } else if (plotData.length < 300) {
        outlineWidth = 0.05;
    } else if (plotData.length < 1000) {
        outlineWidth = 0.01;
    } else {
        outlineWidth = 0;
    }
    const bars = plotData.map((d, i) => (
        // don't draw bars with a value of 0
        d.value > 0 &&
        <rect
            key={i}
            x={marginLeft + W / B / 8 + i * binWidth}
            y={y(d.value)}
            width={barWidth}
            height={height - marginBottom - y(d.value)}
            stroke={strokeColor}
            strokeWidth={outlineWidth}
            fillOpacity={1}
            onMouseOver={() => setHoveredData(d)}
            onMouseOut={() => setHoveredData(null)}
            fill={hoveredData ? (d.date === hoveredData.date ? 'var(--primary-light)' : 'var(--primary-dark)') : 'var(--primary-dark)'}
        />
    ));

    let xTicksHeight = 0;
    if (plotData.length < 27) {
        xTicksHeight = 6;
    }
    else if (plotData.length < 90) {
        xTicksHeight = 4;
    }
    else if (plotData.length < 200) {
        xTicksHeight = 2;
    }

    // B+1 xTicks
    const xTicks = [...Array(B + 1)].map((d, i) => (
        <g key={i} transform={`translate(${marginLeft + i * binWidth}, 0)`}>
            <line y1={0} y2={xTicksHeight} stroke={strokeColor} />
        </g>
    ));

    // x-axis scale
    let x = d3.scaleTime()
        .domain([d3.min(plotData, d => d.date) || new Date(), d3.max(plotData, d => d.date) || new Date()])
        .range([marginLeft + binWidth / 2, width - marginRight - binWidth / 2]);

    // In order to accurately place the x-axis labels, we need to map the range of xPeriodMidpoints to the range of x(plotData range)
    const plotDataMinDate = d3.min(plotData, d => d.date)?.getTime() || new Date().getTime();
    const plotDataMaxDate = d3.max(plotData, d => d.date)?.getTime() || new Date().getTime();
    // So, if the range of x(plotData range) is [2024-01-14, 2024-04-10], the range of xPeriodMidpoints is [2024-01-01, 2024-04-01], 
    // and x range is [40, 600].
    // so extent of x is 600 - 40 = 560, and extent of plotData is 2024-04-10 - 2024-01-14 = 86 days (though it will actually be in milliseconds).
    // then we need to scale the xPeriodMidpoints range such that:
    //   2024-02-01 would be around (40 + 560 * (2024-02-01 - 2024-01-14) / 86) = 40 + 560 * 18 / 86 = 40 + 560 * 0.2093 = 40 + 117.2 = 157.2
    //   2024-03-01 would be around , 2024-04-01 would be around 40 + 560 * (2024-04-01 - 2024-01-14) / 86 = 40 + 560 * 77 / 86 = 40 + 560 * 0.8953 = 40 + 501.7 = 541.7
    //   2024-04-01 would be around 40 + 560 * (2024-04-01 - 2024-01-14) / 86 = 40 + 560 * 77 / 86 = 40 + 560 * 0.8953 = 40 + 501.7 = 541.7
    //   (But again this is all in milliseconds, not days, so the actual numbers will be slightly different.)
    // So, we need to scale the xPeriodMidpoints range to the range of x(plotData range).

    const xPeriodMidpointsScaled = (xPeriodMidpoints as xPeriodMidpoint[]).map((d, i) => {
        // const date = Math.min(Math.max(new Date(d.midpoint).getTime(), plotDataMinDate), plotDataMaxDate);
        // x[0] + (x[1]-x[0]) * (date - plotDataMinDate) / (plotDataMaxDate - plotDataMinDate)
        // const scaled = (x.range()[0] + binWidth / 2 + ((x.range()[1]  - binWidth / 2) - (x.range()[0] + binWidth / 2)) * (date - plotDataMinDate) / (plotDataMaxDate - plotDataMinDate));
        // try plotting the i's evenly spaced along the range
        const scaled = (x.range()[0]) + i * binWidth;
        return { ...d, scaled: scaled };
    });

    // Create x-axis labels
    type xPeriodMidpointScaled = xPeriodMidpoint & { scaled: number };
    const xLabelGap = 10;
    let xLabels = [];
    if ( xLabsFormatSpec == '%a') {
        xLabels = (xPeriodMidpointsScaled as xPeriodMidpointScaled[]).map((d, i) => (
            (d.midpoint >= x.domain()[0].setHours(0,0,0,0) && d.midpoint <= x.domain()[1].setHours(23,59,59,999)) &&
            <g key={i} transform={`translate(${d.scaled}, 0)`}>
                {/* <line y1={-xLabelGap} y2={xTicksHeight * 2} stroke={strokeColor} /> */}
                <text style={xLabelsStyle} dy=".71em">
                    {d.altLabel ? d.altLabel : d.formatted}
                </text>
            </g>
        ));
    } else {
        if (xGrain == 'Days' && xPeriodMidpointsScaled.length < dayGrainYearMonthLabelMaxDays) {
            xLabels = (xPeriodMidpointsScaled as xPeriodMidpointScaled[]).map((d, i) => (
                (d.midpoint >= x.domain()[0].setHours(0,0,0,0) && d.midpoint <= x.domain()[1].setHours(23,59,59,999)) &&
                <g key={i} transform={`translate(${x(d.midpoint) + binWidth / 2}, 0)`}>
                    {/* <line y1={-xLabelGap} y2={xTicksHeight * 2} stroke={strokeColor} /> */}
                    <text style={xLabelsStyle} dy=".71em">
                        {d.altLabel ? d.altLabel : d.formatted}
                    </text>
                </g>
            ));

        } else {
            xLabels = (xPeriodMidpointsScaled as xPeriodMidpointScaled[]).map((d, i) => (
                (d.midpoint >= x.domain()[0].setHours(0,0,0,0) && d.midpoint <= x.domain()[1].setHours(23,59,59,999)) &&
                <g key={i} transform={`translate(${x(d.midpoint)}, 0)`}>
                    {/* <line y1={-xLabelGap} y2={xTicksHeight * 2} stroke={strokeColor} /> */}
                    <text style={xLabelsStyle} dy=".71em">
                        {d.altLabel ? d.altLabel : d.formatted}
                    </text>
                </g>
            ));
        }
    }

    // Create y-axis ticks
    const yTicks = y.ticks().map((tickValue, i) => (
        <g key={i} transform={`translate(0, ${y(tickValue)})`}>
            <line x2={width - marginLeft - marginRight} stroke={strokeColor} strokeOpacity={0.2} />
            <text style={yLabelsStyle} x={-10} dx=".16em">
                {tickValue}
            </text>
        </g>
    ));

    return (
        <div>
            <svg width={width} height={height} style={{ maxWidth: '100%', height: 'auto' }} preserveAspectRatio='xMinYMin meet'>
                <g>
                    <g transform={`translate(0, ${height - marginBottom})`} style={ticksStyle}>
                        {xTicks}
                    </g>
                    <g className="" transform={`translate(0, ${height - marginBottom + xLabelGap})`} style={ticksStyle}>
                        {xLabels}
                    </g>
                    <g transform={`translate(${marginLeft}, 0)`} style={ticksStyle}>
                        {yTicks}
                    </g>
                    {bars}
                </g>
            </svg>
            {hoveredData && (
                <Tooltip
                    hoveredData={hoveredData}
                    scales={{x, y}}
                />
            )}
        </div>
    );
}

export default BarTimeSeries;