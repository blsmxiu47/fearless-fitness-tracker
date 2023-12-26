'use client'

import { useState, useEffect } from 'react'

import '../../globals.css'
import { useSidebar } from '../context/sidebar-provider'
import PlanCard from '../components/PlanCard'
import ExerciseCard from '../components/ExerciseCard'
import RoutineCard from '../components/RoutineCard'
import { plans, exercises, workouts, routines } from '@prisma/client'

export default function Explore() {
    // TODO: checkboxes state for filtering content
    const [plans, setPlans] = useState<plans[]>([]);
    const [routines, setRoutines] = useState<routines[]>([]);
    const [exercises, setExercises] = useState<exercises[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isSidebarOpen } = useSidebar();

    const fetchEndpoint = async (ep: string) => {
        try {
            const res = await fetch(
                '/api/' + ep,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if (!res.ok) throw new Error(res.statusText)
            return await res.json()
        } catch (error) {
            console.error('fetch error:', error)
            throw error;
        }
    }

    useEffect(() => {
        const loadPlans = async () => {
            try {
                const data = await fetchEndpoint('plan');
                setPlans(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadPlans();
    }, []);
    useEffect(() => {
        const loadRoutines = async () => {
            try {
                const data = await fetchEndpoint('routine');
                setRoutines(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadRoutines();
    }, []);
    useEffect(() => {
        const loadExercises = async () => {
            try {
                const data = await fetchEndpoint('exercise');
                setExercises(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadExercises();
    }, []);

    return (
        <div className={`py-2 transition-all ${isSidebarOpen ? "sm:ml-64" : "sm:ml-16"}`}>
            <h2>Explore</h2>
            <div>
                <span className="pr-2">Created by:</span>
                <ul className="inline-flex gap-2">
                    <li>
                        <input checked type="checkbox" id="me-option" value="" className="hidden peer" />
                        <label htmlFor="me-option" className="inline-flex justify-center px-4 p-1 cursor-pointer border-2 border-gray-200 rounded-full dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-200 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                            <span>Me</span>
                        </label>
                    </li>
                    <li>
                        <input checked type="checkbox" id="community-option" value="" className="hidden peer" />
                        <label htmlFor="community-option" className="inline-flex justify-center px-4 py-1 cursor-pointer border-2 border-gray-200 rounded-full dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-200 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <span>Community</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="mx-2 mt-4">
                <h3>Training Plans</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    {plans.map((plan: plans) => (
                        <PlanCard title={plan.name} description={plan.description!} duration={plan.duration!} frequency={plan.frequency!} link={`/plan/${plan.id}`} tags={plan.tags} />
                    ))}
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Routines</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    {routines.map((routine: routines) => (
                        <RoutineCard title={routine.name} subtitle='to be removed' label='to be removed' link={`/routine/${routine.id}`} />
                    ))}
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Exercises</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    {exercises.map((exercise: exercises) => (
                        <ExerciseCard title={exercise.name} subtitle='to be removed' label='to be removed' link={`/exercise/${exercise.id}`} />
                    ))}
                </div>
            </div>
        </div>

    )
}