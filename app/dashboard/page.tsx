'use client'

import { useEffect, useState } from 'react'

// import getSessionCounts from '../server-functions/data-processing/getSessionCounts'
import { TimeSeriesResult } from '../../lib/types'

import Card from '../components/Card'
import TimeRangeSelect from '../components/TimeRangeSelect'
import TimeUnitSelect from '../components/TimeUnitSelect'
import BarTimeSeries from '../charts/BarTimeSeries'
import LinePlot from '../charts/LinePlot'

import '../../globals.css'
import getDistanceSummary from '../server-functions/data-processing/getDistanceSummary'

export default function Dashboard() {
    const [distanceSums, setDistanceSums] = useState<TimeSeriesResult[]>()

    const getAggregatedData = async () => {
        const distanceSums = await getDistanceSummary()
        setDistanceSums(distanceSums)
    }

    useEffect(() => {
        getAggregatedData()
    }, [])

    return (
        <div>
            <div className="flex flex-wrap justify-center p-2 gap-4">
                <TimeRangeSelect />
                <TimeUnitSelect />
            </div>
            <div className="flex flex-wrap px-1 py-4 w-full justify-center">
                <Card title={"Total Distance"} content={<BarTimeSeries data={distanceSums || []} />} />
                <Card title={"Activities"} content={<LinePlot data={[1,2,3,4]} />} />
                <Card title={"Activities Time"} content={<LinePlot data={[1,2,3,4]} />} />
                <Card title={"Distance"} content={<LinePlot data={[1,2,3,4]} />} />
            </div>
        </div>
    )
}