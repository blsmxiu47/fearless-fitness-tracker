'use client'

import * as d3 from 'd3';

import { TimeSeriesResult } from '../../lib/types';

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
};

const BarTimeSeries: React.FC<BarTimeSeriesProps> = ({
    data = [],
    xLabels = [],
    yLabels = [],
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 40,
    marginLeft = 40
}) => {
    const x = d3.scaleTime(data.map(d => d.date), [marginLeft, width - marginRight])
        .domain([d3.min(data, d => d.date) || new Date(), d3.max(data, d => d.date) || new Date()])
        .range([marginLeft, width - marginRight]);
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value) || 0])
        .range([height - marginBottom, marginTop]);
        
    // Create bars
    const bars = data.map(d => (
        <rect
            key={d.date.toString()}
            x={x(d.date)}
            y={y(d.value)}
            width={1}
            height={y(0) - y(d.value)}
            fill={`var(--primary)`}
            fillOpacity={0.5}
        />
    ));

    // Create x-axis ticks
    const xAxisTicks = x.ticks().map((tickValue) => (
        <g key={tickValue.toString()} transform={`translate(${x(tickValue)}, 0)`}>
            <line y2={10} stroke="white" />
            <text style={{ textAnchor: 'middle', font: '9px Arial', fill: 'white' }} dy=".16em" y={25}>
                {d3.timeFormat("%Y-%m-%d")(tickValue)}
            </text>
        </g>
    ));

    // Create y-axis ticks
    const yAxisTicks = y.ticks().map((tickValue) => (
        <g key={tickValue} transform={`translate(0, ${y(tickValue)})`}>
            <line x2={width - marginLeft - marginRight / 2} stroke="white" />
            <text style={{ textAnchor: 'end', font: '11px Arial', fill: 'white' }} x={-10} dx=".16em">
                {tickValue}
            </text>
        </g>
    ));
    console.log('yAxisTicks', yAxisTicks);
    
    // Format axes
    const xAxis = d3.axisBottom(x).tickSizeOuter(0);
    const yAxis = d3.axisLeft(y);

    return (
        <svg width={width} height={height} style={{ maxWidth: '100%', height: 'auto' }} preserveAspectRatio='xMinYMin meet'>
            <g>{bars}</g>
            <g transform={`translate(0, ${height - marginBottom})`}>{xAxisTicks}</g>
            <g transform={`translate(${marginLeft}, 0)`}>{yAxisTicks}</g>
            {bars}
        </svg>
    );
}

export default BarTimeSeries;