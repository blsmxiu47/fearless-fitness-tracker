'use client'

import { useState, useEffect } from 'react'

import '../../globals.css'
import PlanCard from '../components/PlanCard'
import ExerciseCard from '../components/ExerciseCard'
import RoutineCard from '../components/RoutineCard'
import { plans, routines } from '@prisma/client'
import { Exercise as exercise } from '../../lib/types'

export default function Explore() {
    const [meChecked, setMeChecked] = useState(true);
    const [communityChecked, setCommunityChecked] = useState(true);
    const [plansData, setPlansData] = useState<plans[]>([]);
    const [plans, setPlans] = useState<plans[]>([]);
    const [routinesData, setRoutinesData] = useState<routines[]>([]);
    const [routines, setRoutines] = useState<routines[]>([]);
    const [exercisesData, setExercisesData] = useState<exercise[]>([]);
    const [exercises, setExercises] = useState<exercise[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEndpoint = async (ep: string, user = true, community = true) => {
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
                const plansData = await fetchEndpoint('plan');
                setPlansData(plansData);
                setPlans(plansData);
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
                const routinesData = await fetchEndpoint('routine');
                setRoutinesData(routinesData);
                setRoutines(routinesData);
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
                const exercisesData = await fetchEndpoint('exercise');
                setExercisesData(exercisesData);
                setExercises(exercisesData);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadExercises();
    }, []);

    const filterData = () => {
        if (meChecked && communityChecked) {
            setPlans(plansData);
            setRoutines(routinesData);
            setExercises(exercisesData);
            return;
        } else if (meChecked) {
            setPlans(plansData.filter(plan => plan.user_id === 1));
            setRoutines(routinesData.filter(routine => routine.user_id === 1));
            setExercises(exercisesData.filter(exercise => exercise.user_id === 1));
            return;
        } else if (communityChecked) {
            setPlans(plansData.filter(plan => plan.user_id !== 1));
            setRoutines(routinesData.filter(routine => routine.user_id !== 1));
            setExercises(exercisesData.filter(exercise => exercise.user_id !== 1));
            return;
        } else {
            setPlans([]);
            setRoutines([]);
            setExercises([]);
            return;
        }
    }

    const handleMeToggle = () => {
        setMeChecked(!meChecked);
    }

    const handleCommunityToggle = () => {
        setCommunityChecked(!communityChecked);
    }

    useEffect(() => {
        filterData();
    }, [meChecked, communityChecked]);

    return (
        <div>
            <h2>Explore</h2>
            <div>
                <span className="pr-2">Created by:</span>
                <ul className="inline-flex gap-2">
                    <li>
                        <input type="checkbox" id="me-option" value="me" className="hidden peer/me" checked={meChecked} onChange={handleMeToggle} />
                        <label htmlFor="me-option" className="inline-flex justify-center px-4 p-1 cursor-pointer border-2 border-gray-200 rounded-full dark:hover:text-gray-300 dark:border-gray-700 peer-checked/me:border-[var(--accent-3)] hover:text-gray-600 dark:peer-checked/me:text-gray-300 peer-checked/me:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                            <span>Me</span>
                        </label>
                    </li>
                    <li>
                        <input type="checkbox" id="community-option" value="community" className="hidden peer/community" checked={communityChecked} onChange={handleCommunityToggle} />
                        <label htmlFor="community-option" className="inline-flex justify-center px-4 py-1 cursor-pointer border-2 border-gray-200 rounded-full dark:hover:text-gray-300 dark:border-gray-700 peer-checked/community:border-[var(--accent-3)] hover:text-gray-600 dark:peer-checked/community:text-gray-300 peer-checked/community:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <span>Community</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="mx-2 mt-4">
                <h3>Training Plans</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    {plans.map((plan: plans) => (
                        <PlanCard key={plan.id} title={plan.name} description={plan.description!} duration={plan.duration!} frequency={plan.frequency!} link={`/training-plans/${plan.id}`} tags={plan.tags} />
                    ))}
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Routines</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    {routines.map((routine: routines) => (
                        <RoutineCard key={routine.id} title={routine.name} duration={routine.duration!} link={`/routine/${routine.id}`} />
                    ))}
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Exercises</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    {exercises.map((exercise: exercise) => (
                        <ExerciseCard key={exercise.id} title={exercise.name} type={exercise.type?.name} focus={exercise.focus?.name} link={`/exercise/${exercise.id}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}