'use client'

import { useState, useEffect } from 'react'

import { fetchEndpoint } from "../../utils/fetchEndpoint";
import { Run } from "../../lib/types";

export default function MyRunsTable() {
    const [runs, setRuns] = useState<Run[]>([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadRuns = async () => {
            try {
                const runsData = await fetchEndpoint('run');
                setRuns(runsData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadRuns();
    }, []);

    return (
        <div className="overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="text-xs sm:text-sm md:text-md font-semibold text-left bg-gray-800 border-b border-gray-600">
                        <th className="px-4 py-3 rounded-tl-lg">Date</th>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Duration</th>
                        <th className="px-4 py-3">Distance</th>
                        <th className="px-4 py-3 rounded-tr-lg">Elevation Gain</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <tr><td>Loading runs...</td></tr>}
                    {runs.length === 0 && !isLoading && <tr><td>No runs found</td></tr>}
                    {
                        runs.map((run, i) => (
                            <tr key={i} className="text-xs sm:text-sm md:text-md">
                                <td className="px-4 py-3">{new Date(Date.parse(run.datetime)).toLocaleDateString()}</td>
                                <td className="px-4 py-3">{new Date(Date.parse(run.datetime)).toLocaleTimeString()}</td>
                                <td className="px-4 py-3">{run.duration}</td>
                                <td className="px-4 py-3">{run.distance}</td>
                                <td className="px-4 py-3">{run.elevation_gain}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}