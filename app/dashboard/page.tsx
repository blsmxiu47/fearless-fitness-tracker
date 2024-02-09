'use client'

import { useEffect, useState } from 'react'

import { TimeSeriesResult } from '../../lib/types'

import Card from '../components/Card'
import SelectDropdown from '../components/SelectDropdown'
import BarTimeSeries from '../charts/BarTimeSeries'

import getDistanceSummary from '../server-functions/data-processing/getDistanceSummary'

import '../../globals.css'

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [timeUnit, setTimeUnit] = useState<'Days' | 'Weeks' | 'Months' | 'Years'>('Days')
    const [distanceSums, setDistanceSums] = useState<TimeSeriesResult[]>()

    const d = new Date()
    const day = d.getDay()
    const diff = d.getDate() - day + (day == 0 ? -6 : 1)
    d.setDate(diff)

    const [dateRange, setDateRange] = useState<[Date, Date]>([d, new Date()])
    const [rangeSelection, setRangeSelection] = useState('Past 7 Days')
    const [customDateRange, setCustomDateRange] = useState<[Date, Date]>([new Date(), new Date()])

    const getAggregatedData = async () => {
        const distanceSums = await getDistanceSummary()
        setDistanceSums(distanceSums)
        setIsLoading(false)
    }

    useEffect(() => {
        getAggregatedData()
    }, [])

    useEffect(() => {
        handleTimeRangeChange(rangeSelection, customDateRange)
    }, [customDateRange])

    const handleTimeRangeChange = (rangeSelection: string, customDateRange: [Date, Date]) => {
        console.log('rangeSelection', rangeSelection)

        let rangeStart = new Date()
        let rangeEnd = new Date()
        switch (rangeSelection) {
            case "Past 7 Days":
                console.log('rangeStart pre-subtract', rangeStart)
                rangeStart.setDate(rangeStart.getDate() - 6)
                console.log('rangeStart post-subtract', rangeStart)
                break
            case "Past 28 Days":
                console.log('rangeStart pre-subtract', rangeStart)
                rangeStart.setDate(rangeStart.getDate() - 27)
                console.log('rangeStart post-subtract', rangeStart)
                break
            case "Past Year":
                rangeStart.setFullYear(rangeStart.getFullYear() - 1)
                rangeStart.setDate(rangeStart.getDate() + 1)
                break
            case "All Time":
                rangeStart = new Date(1900, 0, 0)
                break
            case "This Week":
                const day = rangeStart.getDay()
                // TODO: some people may not consider Monday as the first day of the week. 
                // This is a bug in the brain, not the code, but nevertheless, add handling of user-set preferences
                const diff = rangeStart.getDate() - day + (day == 0 ? -6 : 1)
                rangeStart.setDate(diff)
                break
            case "This Month":
                rangeStart.setDate(1)
                break
            case "This Year":
                rangeStart.setMonth(0, 1)
                console.log('rangeStart', rangeStart)
                break
            case "Custom Range":
                rangeStart = customDateRange[0]
                rangeEnd = customDateRange[1]
                console.log('Custom Range rangeStart rangeEnd', rangeStart, rangeEnd)
                break
        }

        // ensure distanceSums is defined.
        // TODO: before this code is accessed distanceSums shall be defined or else the app will have thrown a data fetching-related error message to the user
        if (distanceSums) {
            const distanceSumDates = distanceSums.map(d => d.date.getTime())
            const dataMinDate = new Date(Math.min(...distanceSumDates))
            const rangeStartDate = Math.max(rangeStart.getTime(), dataMinDate.getTime())
            const rangeEndDate = Math.min(rangeEnd.getTime(), new Date().getTime())

            console.log('rangeStartDate, rangeEndDate', rangeStartDate, rangeEndDate)

            setDateRange([new Date(rangeStartDate), new Date(rangeEndDate)])

            console.log('dateRange', dateRange)
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
                        label='Time Range'
                        defaultOption='Past 7 Days'
                        optionGroups={[
                            [1, ['Past 7 Days', 'Past 28 Days', 'Past Year', 'All Time']],
                            [2, ['This Week', 'This Month', 'This Year']],
                            [3, ['Custom Range']]
                        ]}
                        onChange={(rangeSelection) => handleTimeRangeChange(rangeSelection, customDateRange)}
                    />
                </div>
                <div className="w-[11rem]">
                    <SelectDropdown
                        label='Time Unit'
                        defaultOption='Days'
                        optionGroups={[
                            [1, ['Days', 'Weeks', 'Months', 'Years']]
                        ]}
                        onChange={(option) => handleTimeUnitChange(option)}
                    />
                </div>
            </div>
            <div className="flex flex-wrap px-1 py-4 w-full justify-center">
                {isLoading && <p>Loading...</p>}
                {!isLoading && distanceSums && (
                    <Card
                        title={"Total Distance"}
                        content={
                            <BarTimeSeries 
                                data={distanceSums || []}
                                dateRange={dateRange}
                                xGrain={timeUnit}
                                useMovingAverage={false}
                                movingAverageWindow={7}
                            />
                        }
                    />
                )}
            </div>
        </div>
    )
}