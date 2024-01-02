import Link from 'next/link'

export default function ExerciseDetailCard (fn: {
    ordinal: number,
    title: string,
    sets: number,
    reps: number,
    duration: string,
    weight: string,
    rest: string,
    type: string,
    focus: string,
    link: string
}) {
    return (
        <div className="w-full lg:w-1/2">
            <Link href={fn.link}>
                <div className="relative top-0 right-0 p-2">
                    <span className="px-2 py-1 text-xs font-bold text-white bg-gray-800 rounded">{fn.ordinal}</span>
                </div>
                <div className="group relative flex bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 m-2 overflow-auto rounded-lg">
                    <div className="flex items-center px-2 pt-4 pb-2">
                        <div>
                            <span className="text-sm font-semibold">{fn.title}</span>
                            <p className="text-xs text-gray-800 dark:text-gray-300">{fn.sets} sets x {fn.reps ? fn.reps + ' reps' : fn.duration}</p>
                            <p className="text-xs text-gray-800 dark:text-gray-300">{fn.weight ? fn.weight : 'No weight'}</p>
                            {fn.rest && 
                                <p className="text-xs text-gray-800 dark:text-gray-300">{fn.rest}</p>
                            }
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <span>{fn.type}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <span>{fn.focus}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}