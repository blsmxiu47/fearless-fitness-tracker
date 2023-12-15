import * as d3 from 'd3';

export default function LinePlot({
    data = [0],
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20
  }) {
    const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);

    const extent = d3.extent(data);
    console.log(extent);
    const y = d3.scaleLinear(extent[0] !== undefined && extent[1] !== undefined ? extent : [0, 0], [height - marginBottom, marginTop]);
    
    const line = d3.line((d, i) => x(i), y);

    return (
      <svg width={width} height={height}>
        <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data) || ""} />
        <g fill="white" stroke="currentColor" strokeWidth="1.5">
          {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
        </g>
      </svg>
    );
  }