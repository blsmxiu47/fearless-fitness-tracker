'use client'

import { useState } from 'react'
import * as d3 from 'd3';

import { TimeSeriesResult } from '../../lib/types';

import Tooltip from './Tooltip';

type dateGrain = 'Days' | 'Weeks' | 'Months' | 'Years';

type LineTimeSeriesProps = {
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
    xGrain?: dateGrain;
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

const LineTimeSeries: React.FC<LineTimeSeriesProps> = ({
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
    const [hoveredPoint, setHoveredPoint] = useState<TimeSeriesResult | null>(null);

    // Filter data by date range
    if (dateRange.length) {
        data = data.filter(d => d.date >= dateRange[0] && d.date <= dateRange[1]);
    }

    // handle date grain (day, week, month, year, all-time)
    if (xGrain !== 'Days') {
        const dateGrainMap = {
            'Weeks': d3.timeWeek,
            'Months': d3.timeMonth,
            'Years': d3.timeYear,
        };
        const dateGrainFunc = dateGrainMap[xGrain];
        // rollup data by date grain to get sum of values for each grain
        const agg_data = d3.rollups(data, v => d3.sum(v, d => d.value), d => dateGrainFunc(d.date));
        data = agg_data.map(([date, value]) => ({ date, value }));
    }

    // handle moving average
    if (useMovingAverage) {
        const values = data.map(d => d.value);
        const means = simpleMovingAverage(values, movingAverageWindow);
        data = data.map((d, i) => ({ ...d, value: means[i] }));
    }

    // filter out any null values (e.g. from moving average calculations)
    data = data.filter(d => !isNaN(d.value));

    // set local vars
    const pointRadius = data.length > 1000 ? 1 : 3;
    const lineWidth = data.length > 1000 ? 1 : 2;

    // Create scales
    const x = d3.scaleTime(data.map(d => d.date), [marginLeft, width - marginRight])
        .domain([d3.min(data, d => d.date) || new Date(), d3.max(data, d => d.date) || new Date()])
        .range([marginLeft, width - marginRight]);
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 0])
        .range([height - marginBottom, marginTop]);
        
    // Create line
    const line = d3.line<TimeSeriesResult>()
        .x((d) => x(d.date))
        .y((d) => y(d.value))
        .curve(d3.curveMonotoneX)(data);
    
    // Create area
    const area = d3.area<TimeSeriesResult>()
        .x((d) => x(d.date))
        .y0(y(0))
        .y1((d) => y(d.value))
        .curve(d3.curveMonotoneX)(data);
        
    // Add points as well
    const points = data.map((d) =>
                <circle
                    key={d.date.toString()}
                    cx={x(d.date)}
                    cy={y(d.value)}
                    r={pointRadius}
                    fill="white"
                    fillOpacity={0.9}
                    // display tooltip on hover
                    onMouseOver={() => setHoveredPoint(d)}
                    onMouseOut={() => setHoveredPoint(null)}
                />
    );

    // Create x-axis ticks
    const xAxisTicks = x.ticks().map((tickValue) => (
        <g key={tickValue.toString()} transform={`translate(${x(tickValue)}, 0)`}>
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
    const yAxisTicks = y.ticks().map((tickValue) => (
        <g key={tickValue} transform={`translate(0, ${y(tickValue)})`}>
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
                    <path d={line || ''} fill="none" fillOpacity={0.5} stroke={"var(--primary)"} strokeWidth={lineWidth} />
                    <path d={area || ''} fill={"var(--primary)"} fillOpacity={0.2} stroke={"none"} />
                    {points}
                </g>
            </svg>
            {hoveredPoint && (
                <Tooltip
                    hoveredPoint={hoveredPoint}
                    scales={{x, y}}
                />
            )
            }
        </div>
    );
}

export default LineTimeSeries;