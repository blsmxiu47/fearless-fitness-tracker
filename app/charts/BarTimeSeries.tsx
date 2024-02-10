'use client'

import { useMemo, useState } from 'react'
import * as d3 from 'd3';

import { TimeSeriesResult } from '../../lib/types';

import Tooltip from './Tooltip';

type xGrain = 'Days' | 'Weeks' | 'Months' | 'Years';

type BarTimeSeriesProps = {
    data: TimeSeriesResult[];
    xLabels?: string[];
    yLabels?: string[];
    width?: number;
    height?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
    dateRange?: [Date, Date];
    xGrain?: xGrain;
    useMovingAverage?: boolean;
    movingAverageWindow?: number;
};

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
    const [hoveredData, setHoveredData] = useState<TimeSeriesResult | null>(null);
    
    const [plotData, xTicksFormat] = useMemo(() => {
        if (dateRange.length != 2) {
            return [[], d3.timeFormat('%Y')];
        }
        // Filter data by date range
        data = data.filter(d => d.date >= dateRange[0] && d.date <= dateRange[1]);
        const today = new Date();
        const maxDate = d3.max(data, d => d.date);
        const missingToDate = d3.timeDays(maxDate!, today);
        const missingData = missingToDate.map(date => ({ date, value: 0 }));
        data = data.concat(missingData);
        
        // handle date grain (day, week, month, year, all-time)
        let agg_data;
        if (xGrain !== 'Days') {
            const dateGrainMap = {
                'Weeks': d3.timeWeek,
                'Months': d3.timeMonth,
                'Years': d3.timeYear,
            };
            const dateGrainFunc = dateGrainMap[xGrain];
            // rollup data by date grain to get sum of values for each grain
            const rollup = d3.rollups(data, v => d3.sum(v, d => d.value), d => dateGrainFunc(d.date));
            agg_data = rollup.map(([date, value]) => ({ date, value }));
        } else {
            agg_data = data;
        }

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
        let xTicksFormat;
        switch (xGrain) {
            case 'Days':
                if (dateRangeDiff <= 7 * 24 * 60 * 60 * 1000) { // 7 days
                    xTicksFormat = d3.timeFormat('%a');
                } else if (dateRangeDiff <= 60 * 24 * 60 * 60 * 1000) { // 60 days
                    xTicksFormat = d3.timeFormat('%m/%d');
                } else if (dateRangeDiff <= 2 * 365 * 24 * 60 * 60 * 1000) { // 2 years
                    xTicksFormat = d3.timeFormat('%b');
                } else {
                    xTicksFormat = d3.timeFormat('%Y');
                }
                break;
            case 'Weeks':
                if (dateRangeDiff <= 180 * 24 * 60 * 60 * 1000) { // 180 days
                    xTicksFormat = d3.timeFormat('%m/%d');
                } else if (dateRangeDiff <= 2 * 365 * 24 * 60 * 60 * 1000) { // 2 years
                    xTicksFormat = d3.timeFormat('%b');
                } else {
                    xTicksFormat = d3.timeFormat('%Y');
                }
                break;
            case 'Months':
                if (dateRangeDiff <= 2 * 365 * 24 * 60 * 60 * 1000) { // 2 years
                    xTicksFormat = d3.timeFormat('%b');
                } else {
                    xTicksFormat = d3.timeFormat('%Y');
                }
                break;
            case 'Years':
                xTicksFormat = d3.timeFormat('%Y');
                break;
            default:
                xTicksFormat = d3.timeFormat('%0m/%0d');
        }

        return [agg_data, xTicksFormat];
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
    const xTicksGap = W / B;
    const barWidth = W / B * 3 / 4;

    const x = d3.scaleTime()
        .domain([d3.min(plotData, d => d.date) || new Date(), d3.max(plotData, d => d.date) || new Date()])
        .range([marginLeft, width - marginRight]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(plotData, d => d.value) || 0])
        .range([height - marginBottom, marginTop]);
    
    // Create bars
    let outline_width = 0.2;
    if (plotData.length < 200) {
        outline_width = 0.1;
    } else if (plotData.length < 300) {
        outline_width = 0.05;
    } else if (plotData.length < 1000) {
        outline_width = 0.01;
    } else {
        outline_width = 0;
    }
    const bars = plotData.map((d, i) => (
        <rect
            key={i}
            x={marginLeft + W / B / 8 + i * xTicksGap}
            y={y(d.value)}
            width={barWidth}
            height={height - marginBottom - y(d.value)}
            stroke={"#fff"}
            strokeWidth={outline_width}
            fillOpacity={1}
            onMouseOver={() => setHoveredData(d)}
            onMouseOut={() => setHoveredData(null)}
            fill={hoveredData ? (d.date === hoveredData.date ? 'var(--primary-light)' : 'var(--primary-dark)') : 'var(--primary-dark)'}
        />
    ));

    // TODO: for long time ranges, only show unique x labels (e.g. only show one instance of '2023' when xGrain is 'Days' but date range spans multiple years)
    const xTicks = plotData.map((d, i) => (
        <g key={i} transform={`translate(${marginLeft + i * xTicksGap}, 0)`}>
            <line y2={10} stroke="white" />
            {/* {i % Math.ceil(B / 8) === 0 ? ( */}
                <text style={{ textAnchor: 'middle', font: '11px Arial', fill: 'white' }} dy=".71em" y={15} transform={`translate(${xTicksGap * 0.5})`}>
                    {xTicksFormat(d.date)}
                </text>
            {/* ) : null} */}
        </g>
    ));

    // Create y-axis ticks
    const yTicks = y.ticks().map((tickValue, i) => (
        <g key={i} transform={`translate(0, ${y(tickValue)})`}>
            <line x2={width - marginLeft - marginRight} stroke="white" strokeOpacity={0.2} />
            <text style={{ textAnchor: 'end', font: '11px Arial', fill: 'white' }} x={-10} dx=".16em">
                {tickValue}
            </text>
        </g>
    ));

    return (
        <div>
            <svg width={width} height={height} style={{ maxWidth: '100%', height: 'auto' }} preserveAspectRatio='xMinYMin meet'>
                <g>
                    <g transform={`translate(0, ${height - marginBottom})`} style={{ font: '11px Arial', fill: 'white' }}>
                        {xTicks}
                    </g>
                    <g transform={`translate(${marginLeft}, 0)`} style={{ font: '11px Arial', fill: 'white' }}>
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