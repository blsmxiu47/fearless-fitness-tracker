import { TimeSeriesResult } from '../../lib/types'

type TooltipProps = {
    hoveredPoint: TimeSeriesResult;
    scales: {
        x: any;
        y: any;
    };
};

const Tooltip: React.FC<TooltipProps> = ({ hoveredPoint, scales }) => {
    const { x, y } = scales;
    return (
        <div
            style={{
                position: 'absolute',
                left: x(hoveredPoint.date),
                top: y(hoveredPoint.value),
                transform: 'translate(100%, 100%)',
                background: 'rgb(75 85 99)', // grey
                opacity: 0.9,
                color: 'white',
                padding: '0.5rem',
                borderRadius: '5px',
                pointerEvents: 'none',
            }}
        >
            {/* TODO: time and distance units will depend on user prefs */}
            {hoveredPoint.date.toDateString()} <br />
            distance: {hoveredPoint.value}km 
        </div>
    );
}

export default Tooltip;