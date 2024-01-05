'use client'

import { useState } from 'react'

export default function ExerciseInputForm () {
    const measureTypes = ['Reps', 'Duration'];
    const [measureType, setMeasureType] = useState(measureTypes[0]);

    const handleMeasureTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMeasureType(e.target.value);
    }

    const handleSaveExercise = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('save exercise');
        const form = document.getElementById('exercise-form') as HTMLFormElement;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    }

    return (
        <form id="exercise-form" className="flex flex-col mx-2 p-4 max-w-[768px] border rounded-md text-xs sm:text-sm md:text-md" onSubmit={handleSaveExercise} >
            <h4 className="text-sm font-semibold">Add an Exercise</h4>
            <div className="flex items-center gap-2 my-2">
                <label className="w-32" htmlFor="exercise-name">Exercise Name</label>
                <input form="exercise-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-name" id="exercise-name" placeholder={"e.g. \"Plank\""} />
            </div>
            <div className="flex items-center gap-2 my-2">
                <label className="w-32" htmlFor="exercise-sets">Sets</label>
                <input form="exercise-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="number" name="exercise-sets" id="exercise-sets" min="1" max="99" placeholder="2" />
            </div>
            <div className="flex items-center gap-2 my-2">
                <select form="exercise-form" className="w-32 py-2 overflow-hidden dark:bg-gray-800 rounded-sm focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" name="exercise-measure-type" id="exercise-measure-type" value={measureType} onChange={e => handleMeasureTypeChange(e)}>
                    {measureTypes.map((measureType, i) => (
                        <option key={i} value={measureType}>{measureType}</option>
                    ))}
                </select>
                {measureType === 'Reps' &&
                    <input form="exercise-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-reps" id="exercise-reps" placeholder={"e.g. \"8\" or \"10-12\""} />}
                {measureType === 'Duration' &&
                    <input form="exercise-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-duration" id="exercise-duration" placeholder={"e.g. \"30 seconds\""} />}
            </div>
            <div className="flex items-center gap-2 my-2">
                <label className="w-32" htmlFor="exercise-weight">Weight</label>
                <input form="exercise-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-weight" id="exercise-weight" placeholder={"e.g. \"2 lbs\""} />
            </div>
            <div className="flex items-center gap-2 my-2">
                <label className="w-32" htmlFor="exercise-rest">Rest</label>
                <input form="exercise-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-rest" id="exercise-rest" placeholder={"e.g. \"30 seconds\""} />
            </div>
            <div className="flex items-center gap-2 my-2">
                <label className="w-32" htmlFor="exercise-type">Type</label>
                <input form="exercise-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-type" id="exercise-type" placeholder={"e.g. \"Core\""} />
            </div>
            <div className="flex items-center gap-2 my-2">
                <label className="w-32" htmlFor="exercise-focus">Focus</label>
                <input form="exercise-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-focus" id="exercise-focus" placeholder={"e.g. \"Stability\""} />
            </div>
            <div className="flex items-center gap-2 my-2">
                <label className="w-32" htmlFor="exercise-notes">Notes</label>
                <textarea form="exercise-form" className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" name="exercise-notes" id="exercise-notes" placeholder={"e.g. \"Remove the weight after the first two sets\""} />
            </div>
            <div className="flex justify-center my-2">
                <button form="exercise-form" type="submit" className="px-4 py-2 my-2 text-sm font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                    Save
                </button>
            </div>
        </form>
    )
}