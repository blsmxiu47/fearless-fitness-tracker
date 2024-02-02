'use client'

import { useState, useEffect, useRef } from 'react'
import { fetchEndpoint } from '../../utils/fetchEndpoint'
import { addExercise } from '../actions/addExercise'

export default function ExerciseInputForm () {
    const [focuses, setFocuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const measureTypes = ['Reps', 'Duration'];
    const [measureType, setMeasureType] = useState(measureTypes[0]);
    const ref = useRef<HTMLFormElement>(null);

    const handleMeasureTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMeasureType(e.target.value);
    }

    useEffect(() => {
        const loadFocuses = async () => {
            try {
                const focuses = await fetchEndpoint('focus');
                setFocuses(focuses);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        loadFocuses();
    }, []);


    // const handleSaveExercise = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log('save exercise');
    //     const form = document.getElementById('exercise-form') as HTMLFormElement;
    //     const formData = new FormData(form);
    //     const data = Object.fromEntries(formData.entries());
    //     console.log(data);
    // }

    return (
        <form
            id="exercise-form"
            ref={ref}
            action={async (formData: FormData) => {
                ref.current?.reset();
                await addExercise(formData);
            }}
            className="flex flex-col sm:mx-2 px-2 py-4 sm:p-4 max-w-[768px] border rounded-md"
        >
            <h4 className="text-sm font-semibold">Add an Exercise</h4>
            <div className="grid grid-cols-3 gap-x-2 gap-y-4 items-center m-2 mb-4 max-w-[768px] text-[0.6rem] sm:text-xs md:text-sm">
                <label htmlFor="exercise-name">Exercise Name*</label>
                <input
                    form="exercise-form"
                    className="col-span-2 pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
                    type="text"
                    name="exercise-name"
                    id="exercise-name"
                    placeholder={"e.g. \"Plank\""}
                    required
                />
                <label htmlFor="exercise-sets">Sets</label>
                <input
                    form="exercise-form"
                    className="col-span-2 pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]"
                    type="number"
                    name="exercise-sets"
                    id="exercise-sets"
                    min="1"
                    max="99"
                    placeholder="2"
                />
                <select form="exercise-form" className="max-w-[128px] py-2 sm:p-2 overflow-hidden dark:bg-gray-800 rounded-sm focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)] sm:border-r-8 sm:border-transparent" name="exercise-measure-type" id="exercise-measure-type" value={measureType} onChange={e => handleMeasureTypeChange(e)}>
                    {measureTypes.map((measureType, i) => (
                        <option key={i} value={measureType}>{measureType}</option>
                    ))}
                </select>
                {measureType === 'Reps' &&
                    <input form="exercise-form" className="col-span-2 pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-reps" id="exercise-reps" placeholder={"e.g. \"8\" or \"10-12\""} />}
                {measureType === 'Duration' &&
                    <input form="exercise-form" className="col-span-2 pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-duration" id="exercise-duration" placeholder={"e.g. \"30 seconds\""} />}
                <label htmlFor="exercise-weight">Weight</label>
                <input form="exercise-form" className="col-span-2 pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-weight" id="exercise-weight" placeholder={"e.g. \"2 lbs\""} />
                <label htmlFor="exercise-rest">Rest</label>
                <input form="exercise-form" className="col-span-2 pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" type="text" name="exercise-rest" id="exercise-rest" placeholder={"e.g. \"30 seconds\""} />
                <label htmlFor="exercise-focus">Focus</label>
                <select form="exercise-form" className="col-span-2 p-2 overflow-hidden dark:bg-gray-800 rounded-sm focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)] border-r-8 border-transparent" name="exercise-focus" id="exercise-focus">
                    {focuses.map((focus: any) => (
                        <option key={focus.id} value={focus.id}>{focus.name}</option>
                    ))}
                </select>
                <label htmlFor="exercise-notes">Notes</label>
                <textarea form="exercise-form" className="col-span-2 pl-2 pr-6 py-2 overflow-auto dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" name="exercise-notes" id="exercise-notes" placeholder={"e.g. \"Remove the weight after the first two sets\""} />
            </div>
            <div className="flex justify-center my-2">
                <button form="exercise-form" type="submit" className="px-4 py-2 my-2 text-sm font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                    Save
                </button>
            </div>
        </form>
    )
}