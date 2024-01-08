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
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {isLoading && <tr><td>Loading workouts...</td></tr>}
                {
                    workouts.map((workout, i) => (
                        <tr key={i}>
                            <td>{workout.datetime?.toDateString()}</td>
                            <td>{workout.type?.name}</td>
                            <td>{workout.duration}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}