import Link from 'next/link'

export default function ExerciseCard (fn: {
    title: string,
    type: string,
    focus: string,
    link: string
}) {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[240px]">
            <Link href={fn.link} className="group relative flex h-24 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 justify-center p-2 m-2 overflow-auto rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                <div className="absolute top-0 right-0 bg-blue-400 text-white text-xs px-2 py-1 rounded-bl-lg group-hover:bg-blue-300">
                    <span>Exercise</span>
                </div>
                <div className="flex flex-col items-center px-2 pt-4 pb-2">
                    <div className="text-center">
                        <span className="text-sm font-semibold text-center">{fn.title}</span>
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
            </Link>
        </div>
    )
}