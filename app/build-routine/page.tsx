'use client'

import React from 'react'
import '../../globals.css'
import ExerciseInputForm from './ExerciseInputForm'

export default function BuildRoutine() {
    const [isFormVisible, setIsFormVisible] = React.useState(false);
    const [isRoutineValid, setIsRoutineValid] = React.useState(false);
    
    const handleAddExerciseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsFormVisible(true);
    }

    // isRoutineValid is true when the routine name, duration, frequency, and focus are all valid, and at least one exercise has been added
    // TODO

    return (
        <>
            <form id="routine-form" action="" method="POST"></form>
            <div>
                <h2 className="my-2 text-lg">Build a Routine</h2>
                <div className="mx-2">
                    <h3 className="my-2">Summary</h3>
                    <div className="flex flex-col mx-2 max-w-[768px] text-xs sm:text-sm md:text-md">
                        <div className="flex items-center gap-2 my-2">
                            <label className="w-36" htmlFor="routine-name">Routine Name</label>
                            <input form="routine-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="routine-name" id="routine-name" placeholder={"e.g. \"Core A\""} required />
                        </div>
                        <div className="flex items-center gap-2 my-2">
                            <label className="w-36" htmlFor="routine-duration">Duration</label>
                            <input form="routine-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="routine-duration" id="routine-duration" placeholder={"e.g. \"30 minutes\""} required />
                        </div>
                        <div className="flex items-center gap-2 my-2">
                            <label className="w-36" htmlFor="routine-frequency">Frequency</label>
                            <input form="routine-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="routine-frequency" id="routine-frequency" placeholder={"e.g. \"2 sessions per week\""} required />
                        </div>
                        <div className="flex items-center gap-2 my-2">
                            <label className="w-36" htmlFor="routine-focus">Focus</label>
                            <input form="routine-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="routine-focus" id="routine-focus" placeholder={"e.g. \"Stability\""} required />
                        </div>
                    </div>
                    <h3 className="my-2">Exercises</h3>
                    <div className="mx-2">
                        <button className="px-4 py-2 my-2 text-sm font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)] disabled:opacity-70 disabled:hover:bg-[var(--primary)]" onClick={handleAddExerciseClick} disabled={isFormVisible}>
                            + Add Exercise
                        </button>
                        {isFormVisible && <ExerciseInputForm />}
                    </div>
                    <div>
                        <button form="routine-form" className="px-4 py-2 my-2 text-sm font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)] disabled:opacity-70 disabled:hover:bg-[var(--primary)]" type="submit" disabled={isRoutineValid}>
                            Save Routine
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}