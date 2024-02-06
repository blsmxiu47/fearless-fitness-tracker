'use client'

import * as d3 from 'd3';

import { TimeSeriesResult } from '../../lib/types';

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
    useMovingAverage = false,
    movingAverageWindow = 7
}) => {
    // handle moving average
    if (useMovingAverage) {
        const values = data.map(d => d.value);
        const means = simpleMovingAverage(values, movingAverageWindow);
        const meansOfMeans = simpleMovingAverage(means, movingAverageWindow);
        data = data.map((d, i) => ({ ...d, value: meansOfMeans[i] }));
    }

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
    console.log(line);

    // Add points as well
    data = data.filter(d => d.value);
    const points = data.map((d) =>
                <circle
                    key={d.date.toString()}
                    cx={x(d.date)}
                    cy={y(d.value)}
                    r={1.5}
                    fill="white"
                    fillOpacity={0.9}
                />
    );

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

    return (
        <svg width={width} height={height} style={{ maxWidth: '100%', height: 'auto' }} preserveAspectRatio='xMinYMin meet'>
            <g>
                <g transform={`translate(0, ${height - marginBottom})`} style={{ font: '11px Arial', fill: 'white' }}>
                    {xAxisTicks}
                </g>
                <g transform={`translate(${marginLeft}, 0)`} style={{ font: '11px Arial', fill: 'white' }}>
                    {yAxisTicks}
                </g>
                <path d={line || ''} fill="none" fillOpacity={0.5} stroke={"var(--primary)"} strokeWidth="1" />
                {points}
            </g>
        </svg>
    );
}

export default LineTimeSeries;