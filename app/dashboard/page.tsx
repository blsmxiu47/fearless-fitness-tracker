'use client'

import { use, useEffect, useState } from 'react'

import { TimeSeriesResult } from '../../lib/types'

import Card from '../components/Card'
import SelectDropdown from '../components/SelectDropdown'
import LineTimeSeries from '../charts/LineTimeSeries'

import getDistanceSummary from '../server-functions/data-processing/getDistanceSummary'

import '../../globals.css'

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const d = new Date()
    const day = d.getDay()
    const diff = d.getDate() - day + (day == 0 ? -6 : 1)
    d.setDate(diff)
    console.log(d)
    const [dateRange, setDateRange] = useState<[Date, Date]>([d, new Date()])
    const [timeUnit, setTimeUnit] = useState<'Days' | 'Weeks' | 'Months' | 'Years'>('Days')
    const [distanceSums, setDistanceSums] = useState<TimeSeriesResult[]>()

    const getAggregatedData = async () => {
        const distanceSums = await getDistanceSummary()
        setDistanceSums(distanceSums)
        setIsLoading(false)
    }

    useEffect(() => {
        getAggregatedData()
    }, [])

    const handleTimeRangeChange = (rangeSelection: string) => {
        let d = new Date()
        switch (rangeSelection) {
            case "past-7":
                d.setDate(d.getDate() - 7)
            case "past-28":
                d.setDate(d.getDate() - 28)
            case "past-year":
                d.setFullYear(d.getFullYear() - 1)
            case "all-time":
                d = new Date(1900, 0, 0)
            case "this-week":
                const day = d.getDay()
                // TODO: some people may not consider Monday as the first day of the week. 
                // This is a bug in the brain, not the code, but nevertheless, add handling of user-set preferences
                const diff = d.getDate() - day + (day == 0 ? -6 : 1)
                d.setDate(diff)
            case "this-month":
                d.setDate(1)
            case "this-year":
                d.setMonth(0, 1)
            case "custom":
                // do nothing
        }

        // ensure distanceSums is defined.
        // TODO: before this code is accessed distanceSums shall be defined or else the app will have thrown a data fetching-related error message to the user
        if (distanceSums) {
            const distanceSumDates = distanceSums.map(d => d.date.getTime())
            const dataMinDate = new Date(Math.min(...distanceSumDates))
            const rangeStartDate = Math.max(d.getTime(), dataMinDate.getTime())

            setDateRange([new Date(rangeStartDate), new Date()])
        }
    }

    const handleTimeUnitChange = (unitSelection: string) => {
        setTimeUnit(unitSelection as 'Days' | 'Weeks' | 'Months' | 'Years')
    }

    return (
        <div>
            <div className="flex flex-wrap justify-center p-2 gap-4">
                <div className="w-[11rem]">
                    <SelectDropdown
                        defaultOption='Past 7 Days'
                        optionGroups={[
                            [1, ['Past 7 Days', 'Past 28 Days', 'Past Year', 'All Time']],
                            [2, ['This Week', 'This Month', 'This Year']],
                            [3, ['Custom Range']]
                        ]}
                        onChange={() => handleTimeRangeChange}
                    />
                </div>
                <div className="w-[11rem]">
                    <SelectDropdown
                        defaultOption='Days'
                        optionGroups={[
                            [1, ['Days', 'Weeks', 'Months', 'Years']]
                        ]}
                        onChange={() => handleTimeUnitChange}
                    />
                </div>
            </div>
            <div className="flex flex-wrap px-1 py-4 w-full justify-center">
                {isLoading && <p>Loading...</p>}
                {!isLoading && distanceSums && (
                    <Card
                        title={"Total Distance"}
                        content={
                            <LineTimeSeries 
                                data={distanceSums || []}
                                dateRange={dateRange}
                                xGrain={timeUnit}
                                useMovingAverage={false}
                                movingAverageWindow={3}
                            />
                        }
                    />
                )}
            </div>
        </div>
    )
}