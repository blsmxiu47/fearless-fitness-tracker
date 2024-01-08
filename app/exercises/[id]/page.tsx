import '../../../globals.css'
import { Exercise as exercise } from '../../../lib/types'

export async function generateStaticParams() {
    try {
        const res = await fetch(
            'http://localhost:3000/api/exercise',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        if (!res.ok) throw new Error(res.statusText)
        const exercises = await res.json()
        return exercises.map((exercise: exercise) => ({
            params: {
                exercise: {
                    id: exercise.id.toString(),
                }
            }
        }))
    } catch (error) {
        console.error('fetch error:', error)
        throw error;
    }
}

export default async function Exercise({ params }: { params: {
    exercise: exercise;
    id: string;
    name: string;
    duration: string;
    frequency: string;
}}) {
    const getExercise = async (id: string) => {
        try {
            const res = await fetch(
                'http://localhost:3000/api/exercise?id=' + id,
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
    const exercisesRes = await getExercise(params.id);
    const exercise = exercisesRes[0];

    // GET routine for this exercise
    const getRoutine = async (id: string) => {
        try {
            const res = await fetch(
                'http://localhost:3000/api/routine?id=' + exercise.routine_id,
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
    const routinesRes = await getRoutine(params.id);
    const routine = routinesRes[0];

    return (
        <div>
            <h2 className="px-2 py-4 text-lg font-semibold">{exercise.name}</h2>
            <div className="my-2">
                <table className="my-2">
                    <thead>
                        <tr className="text-md font-semibold text-left text-gray-700 dark:text-gray-700 bg-gray-100 border-b border-gray-600">
                            <th className="px-4 py-3">Exercise Details</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-1">Name</td>
                            <td className="px-4 py-1">{exercise.name}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-1">Focus</td>
                            <td className="px-4 py-1">{exercise.focus}</td>
                        </tr>
                        {exercise.ordinal &&
                            <tr>
                                <td className="px-4 py-1">Ordinal</td>
                                <td className="px-4 py-1">{exercise.ordinal} of {routine.length} in {routine.name} Routine</td>
                            </tr>
                        }
                        {exercise.sets &&
                            <tr>
                                <td className="px-4 py-1">Sets</td>
                                <td className="px-4 py-1">{exercise.sets}</td>
                            </tr>
                        }
                        {exercise.reps &&
                            <tr>
                                <td className="px-4 py-1">Reps</td>
                                <td className="px-4 py-1">{exercise.reps}</td>
                            </tr>
                        }
                        {exercise.duration &&
                            <tr>
                                <td className="px-4 py-1">Duration</td>
                                <td className="px-4 py-1">{exercise.duration}</td>
                            </tr>
                        }
                        {exercise.weight &&
                            <tr>
                                <td className="px-4 py-1">Weight</td>
                                <td className="px-4 py-1">{exercise.weight}</td>
                            </tr>
                        }
                        {exercise.rest &&
                            <tr>
                                <td className="px-4 py-1">Rest</td>
                                <td className="px-4 py-1">{exercise.rest}</td>
                            </tr>
                        }
                        {exercise.notes &&
                            <tr>
                                <td className="px-4 py-1">Notes</td>
                                <td className="px-4 py-1">{exercise.notes}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div> 
        </div>
    )
}