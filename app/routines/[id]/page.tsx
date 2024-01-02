import { routines } from '@prisma/client';
import '../../../globals.css'
import ExerciseDetailCard from './ExerciseDetailCard'
import { Exercise as exercise } from '../../../lib/types'

export async function generateStaticParams() {
    try {
        const res = await fetch(
            'http://localhost:3000/api/routine',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        if (!res.ok) throw new Error(res.statusText)
        const routines = await res.json()
        return routines.map((routine: routines) => ({
            params: {
                routine: {
                    id: routine.id.toString(),
                }
            }
        }))
    } catch (error) {
        console.error('fetch error:', error)
        throw error;
    }
}

export default async function Routine({ params }: { params: {
    routine: routines;
    id: string;
    name: string;
    duration: string;
    frequency: string;
}}) {
    const getRoutine = async (id: string) => {
        try {
            const res = await fetch(
                'http://localhost:3000/api/routine?id=' + id,
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

    // GET exercises where routine_id === params.id
    const getExercises = async (id: string) => {
        try {
            const res = await fetch(
                'http://localhost:3000/api/exercise?routine_id=' + id,
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

    const exercises = await getExercises(params.id);

    return (
        <div>
            <h2 className="px-2 py-4 text-lg font-semibold">{routine.name}</h2>
            <div className="my-2">
                <table className="my-2">
                    <thead>
                        <tr className="text-md font-semibold text-left text-gray-700 dark:text-gray-700 bg-gray-100 border-b border-gray-600">
                            <th className="px-4 py-3">Routine Details</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-1">Duration</td>
                            <td className="px-4 py-1">{routine.duration}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-1">Frequency</td>
                            <td className="px-4 py-1">{routine.frequency}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
            <div className="flex flex-wrap justify-center sm:justify-start p-2">
                {exercises.map((exercise: exercise) => (
                    <ExerciseDetailCard
                        key={exercise.ordinal}
                        ordinal={exercise.ordinal}
                        title={exercise.name}
                        sets={exercise.sets}
                        reps={exercise.reps}
                        duration={exercise.duration}
                        weight={exercise.weight}
                        rest={exercise.rest}
                        type={exercise.type?.name}
                        focus={exercise.focus?.name}
                        link={`/exercise/${exercise.id}`} />
                ))}
            </div>
        </div>
    )
}