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
        <div className="relative z-10 w-full lg:w-1/2">
            <Link href={fn.link}>
                <div className="absolute z-15 top-0 right-0 px-2 py-4">
                    <span className="px-4 text-4xl dark:text-white opacity-20">{fn.ordinal}</span>
                </div>
                <div className="flex p-2 m-2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
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