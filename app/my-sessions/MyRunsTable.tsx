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
        <div className="py-2">
            {isLoading && <p>Loading runs...</p>}
            {runs.length === 0 && !isLoading && <p>No runs found</p>}
            {!isLoading && runs.length > 0 && (
                <table className="w-full">
                    <thead>
                        <tr className="text-xs sm:text-sm md:text-md font-semibold text-left bg-gray-800 border-b border-gray-600">
                            <th className="w-1/5 px-4 py-3 rounded-tl-lg">Date</th>
                            <th className="w-1/5 px-4 py-3">Time</th>
                            <th className="w-1/5 px-4 py-3">Duration</th>
                            <th className="w-1/5 px-4 py-3">Distance</th>
                            <th className="w-1/5 px-4 py-3 rounded-tr-lg">Elevation Gain</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            runs.map((run, i) => (
                                <tr key={i} className="overflow-x-hidden text-xs sm:text-sm md:text-md">
                                    <td className="w-1/5 px-4 py-3">{new Date(Date.parse(run.datetime)).toLocaleDateString()}</td>
                                    <td className="w-1/5 px-4 py-3">{new Date(Date.parse(run.datetime)).toLocaleTimeString()}</td>
                                    <td className="w-1/5 px-4 py-3">{run.duration}</td>
                                    <td className="w-1/5 px-4 py-3">{run.distance}</td>
                                    <td className="w-1/5 px-4 py-3">{run.elevation_gain}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}