'use client'

import { useState } from 'react'
import '../../../globals.css'
import { plan_days } from '@prisma/client'

export default function PlanWeekTable({
    weeks,
}: {
    weeks: any;
}) {
    const [activeWeek, setActiveWeek] = useState('1');

    const handleWeekSelect = (e: any) => {
        setActiveWeek(e.target.textContent);
    }

    return (
        <div className="my-2">
            <div className="flex bg-gray-800">
                <span className="px-4 py-3 text-md font-semibold">Week</span>
                <nav className="flex flex-wrap justify-center gap-2">
                    {Object.keys(weeks).map((week: string, i: number) => (
                        <button key={i} className="px-4 py-3 block text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-700 focus:outline-none border-b-2 font-medium border-purple-400" onClick={handleWeekSelect}>{week}</button>
                    ))}
                </nav>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="text-md font-semibold text-left text-gray-700 dark:text-gray-700 bg-gray-100 border-b border-gray-600">
                        <th className="px-4 py-3">Summary</th>
                        <th className="px-4 py-3">Session 1</th>
                        <th className="px-4 py-3">Session 2</th>
                        <th className="px-4 py-3">Total Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {weeks[activeWeek].map((day: plan_days, i: number) => (
                        <tr key={i}>
                            <td className="px-4 py-3">{day.description}</td>
                            <td className="px-4 py-3">{day.session_a}</td>
                            <td className="px-4 py-3">{day.session_b}</td>
                            <td className="px-4 py-3">{day.total_distance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}