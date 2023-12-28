import Link from 'next/link'

import { PiClock, PiClockClockwiseLight } from "react-icons/pi";

export default function PlanCard (fn: {
    title: string,
    description: string,
    duration: string,
    frequency: string,
    link: string,
    tags: string[]
}) {
    return (
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-[240px]">
            <Link href={fn.link}>
                <div className="group relative flex h-40 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 justify-center p-2 m-2 overflow-hidden rounded-lg">
                    <div className="absolute top-0 right-0 bg-red-400 text-white text-xs px-2 py-1 rounded-bl-lg group-hover:bg-red-300">
                        <span>Plan</span>
                    </div>
                    <div className="flex flex-col items-center pt-4">
                        <div className="h-6 overflow-hidden">
                            <span className="text-sm font-semibold">{fn.title}</span>
                        </div>
                        <div className="flex gap-2">
                            <div>
                                <span className="text-xs text-gray-500"><PiClock className="inline-block text-gray-500" /> {fn.duration}</span>
                            </div>
                            <div>
                                <PiClockClockwiseLight className="inline-block text-gray-500" />
                                <span className="text-xs text-gray-500"> {fn.frequency}</span>
                            </div>
                        </div>
                        <div className="p-2">
                            <p className="text-xs text-gray-400">{fn.description}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}