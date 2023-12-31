import Link from 'next/link'

import { PiClock, PiClockClockwiseLight } from "react-icons/pi";

export default function RoutineCard (fn: {
    title: string,
    duration: string,
    link: string,
}) {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[240px]">
            <Link href={fn.link}>
                <div className="group relative flex h-40 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 justify-center p-2 m-2 overflow-hidden rounded-lg">
                    <div className="absolute top-0 right-0 bg-teal-400 text-white text-xs px-2 py-1 rounded-bl-lg group-hover:bg-teal-300">
                        <span>Routine</span>
                    </div>
                    <div className="flex flex-col items-center pt-4">
                        <div className="h-6 overflow-hidden">
                            <span className="text-sm font-semibold">{fn.title}</span>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <PiClock className="inline-block" />
                                <span>{fn.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}