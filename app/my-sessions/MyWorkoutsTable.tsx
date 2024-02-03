'use client'

import { useState, useEffect } from 'react'

import { fetchEndpoint } from "../../utils/fetchEndpoint";
import { Workout } from "../../lib/types";

export default function MyWorkoutsTable() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadWorkouts = async () => {
            try {
                const workoutsData = await fetchEndpoint('workout');
                setWorkouts(workoutsData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadWorkouts();
    }, []);

    return (
        <div className="py-2">
            {isLoading && <p>Loading workouts...</p>}
            {workouts.length === 0 && !isLoading && <p>No workouts found</p>}
            {!isLoading && workouts.length > 0 && (
                <table className="w-full">
                    <thead>
                        <tr className="text-xs sm:text-sm md:text-md font-semibold text-left bg-gray-800 border-b border-gray-600">
                            <th className="w-1/5 px-4 py-3 rounded-tl-lg">Date</th>
                            <th className="w-1/5 px-4 py-3">Type</th>
                            <th className="w-1/5 px-4 py-3">Duration</th>
                            <th className="w-1/5 px-4 py-3">Exercises</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            workouts.map((workout, i) => (
                                <tr key={i} className="overflow-x-hidden text-xs sm:text-sm md:text-md">
                                    <td className="w-1/5 px-4 py-3">{workout.datetime?.toString()}</td>
                                    <td className="w-1/5 px-4 py-3">{workout.type?.name}</td>
                                    <td className="w-1/5 px-4 py-3">{workout.duration}</td>
                                    <td className="w-1/5 px-4 py-3">
                                        <ul>
                                            {workout.workout_exercises.map((e, i) => (
                                                <li key={i}>{e.exercises.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            )}
        </div>
    )
}