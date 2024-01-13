'use client'

import { useState, useEffect } from 'react'
import '../../globals.css'
import { fetchEndpoint } from '../../utils/fetchEndpoint'
import { addRoutine } from '../actions/addRoutine'
import ExerciseInputForm from './ExerciseInputForm'

export default function BuildRoutine() {
    const [types, setTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isRoutineValid, setIsRoutineValid] = useState(false);
    
    const handleAddExerciseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsFormVisible(true);
    }

    useEffect(() => {
        const loadTypes = async () => {
            try {
                const types = await fetchEndpoint('type');
                setTypes(types);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadTypes();
    }, []);

    // isRoutineValid is true when the routine name, duration, frequency, and type are all valid, and at least one exercise has been added
    // TODO

    return (
        <>
            <form id="routine-form" action="" method="POST"></form>
            <div>
                <h2 className="my-2 text-lg">Build a Routine</h2>
                <div className="mx-2">
                    <h3 className="my-2">Summary</h3>
                    <div className="grid grid-cols-3 gap-x-2 gap-y-4 items-center m-2 mb-4 max-w-[768px] text-xs sm:text-sm md:text-md">
                            <label htmlFor="routine-name">Routine Name</label>
                            <input form="routine-form" className="col-span-2 pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="routine-name" id="routine-name" placeholder={"e.g. \"Core A\""} required />
                            <label htmlFor="routine-duration">Duration</label>
                            <input form="routine-form" className="col-span-2 pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="routine-duration" id="routine-duration" placeholder={"e.g. \"30 minutes\""} required />
                            <label htmlFor="routine-frequency">Frequency</label>
                            <input form="routine-form" className="col-span-2 pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="routine-frequency" id="routine-frequency" placeholder={"e.g. \"2 sessions per week\""} required />
                            <label htmlFor="routine-type">Type</label>
                            <select form="routine-form" className="col-span-2 px-2 py-2 dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)] border-r-8 border-transparent" name="routine-type" id="routine-type" required>
                                {types.map((type: any) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                    </div>
                    <h3 className="my-2">Exercises</h3>
                    <div className="mx-2">
                        <button className="px-4 py-2 my-2 text-sm font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)] disabled:opacity-70 disabled:hover:bg-[var(--primary)]" onClick={handleAddExerciseClick} disabled={isFormVisible}>
                            + Add Exercise
                        </button>
                        {isFormVisible && <ExerciseInputForm />}
                    </div>
                    <div className="mx-2">
                        <button form="routine-form" className="px-4 py-2 my-2 text-sm font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)] disabled:opacity-70 disabled:hover:bg-[var(--primary)]" type="submit" disabled={isRoutineValid}>
                            Save Routine
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}