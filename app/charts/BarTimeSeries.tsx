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
    marginRight = 20,
    marginBottom = 40,
    marginLeft = 40,
    dateRange = [],
    xGrain = 'Weeks',
    useMovingAverage = false,
    movingAverageWindow = 7
}) => {
    const [hoveredData, setHoveredData] = useState<TimeSeriesResult | null>(null);

    const plotData = useMemo(() => {
        // Filter data by date range
        if (dateRange.length) {
            data = data.filter(d => d.date >= dateRange[0] && d.date <= dateRange[1]);
            const today = new Date();
            const maxDate = d3.max(data, d => d.date);
            const missingToDate = d3.timeDays(maxDate!, today);
            const missingData = missingToDate.map(date => ({ date, value: 0 }));
            data = data.concat(missingData);
        }

        console.log('data pre-rollup', data);

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

        console.log('data post-rollup', data);

        // handle moving average
        if (useMovingAverage) {
            const values = agg_data.map(d => d.value);
            const means = simpleMovingAverage(values, movingAverageWindow);
            agg_data = agg_data.map((d, i) => ({ ...d, value: means[i] }));
        }

        // filter out any null values (e.g. from moving average calculations)
        agg_data = agg_data.filter(d => !isNaN(d.value));

        return agg_data;
    }, [data, dateRange, xGrain, useMovingAverage, movingAverageWindow]);

    console.log('plotData', plotData);

    // Create scales
    // TODO: xScale and xTocks need re-working for bar chart with datetimes
    const x = d3.scaleTime(plotData.map(d => d.date), [marginLeft, width - marginRight])
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
            x={x(d.date)}
            y={y(d.value)}
            width={width / (plotData.length * 1.2)}
            height={height - marginBottom - y(d.value)}
            stroke={"#fff"}
            strokeWidth={outline_width}
            fillOpacity={1}
            onMouseOver={() => setHoveredData(d)}
            onMouseOut={() => setHoveredData(null)}
            fill={hoveredData ? (d.date === hoveredData.date ? 'var(--primary-light)' : 'var(--primary-dark)') : 'var(--primary-dark)'}
        />
    ));

    // Create x-axis ticks
    // TODO: xScale and xTocks need re-working for bar chart with datetimes
    const xAxisTicks = x.ticks().map((tickValue, i) => (
        <g key={i} transform={`translate(${x(tickValue)}, 0)`}>
            <line y2={10} stroke="white" />
            <text style={{ textAnchor: 'middle', font: '9px Arial', fill: 'white' }} dy=".16em" y={25}>
                {
                    xGrain === 'Days' ? d3.timeFormat('%Y-%m-%d')(tickValue) :
                    xGrain === 'Weeks' ? d3.timeFormat('%Y-%m-%d')(tickValue) :
                    xGrain === 'Months' ? d3.timeFormat('%b')(tickValue) :
                    xGrain === 'Years' ? d3.timeFormat('%Y')(tickValue) : ''
                }
            </text>
        </g>
    ));

    // Create y-axis ticks
    const yAxisTicks = y.ticks().map((tickValue, i) => (
        <g key={i} transform={`translate(0, ${y(tickValue)})`}>
            <line x2={width - marginLeft - marginRight / 2} stroke="white" strokeOpacity={0.2} />
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
                        {xAxisTicks}
                    </g>
                    <g transform={`translate(${marginLeft}, 0)`} style={{ font: '11px Arial', fill: 'white' }}>
                        {yAxisTicks}
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