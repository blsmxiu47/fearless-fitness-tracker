import '../../globals.css'
import Card from '../components/Card'
import TimeRangeSelect from '../components/TimeRangeSelect'
import TimeUnitSelect from '../components/TimeUnitSelect'
import LinePlot from '../charts/LinePlot'

export default function Home () {
    return (
            <div>
                <div className="flex flex-wrap justify-center p-2 gap-4">
                    <TimeRangeSelect />
                    <TimeUnitSelect />
                </div>
                <div className="flex flex-wrap my-4 px-1 w-full justify-center">
                    <Card title={"Activities"} content={<LinePlot data={[1,2,3,4]} />} />
                    <Card title={"Activities Time"} content={<LinePlot data={[1,2,3,4]} />} />
                    <Card title={"Distance"} content={<LinePlot data={[1,2,3,4]} />} />
                </div>
        </div>
    )
}