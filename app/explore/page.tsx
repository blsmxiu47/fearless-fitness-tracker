'use client'

import '../../globals.css'
import { useSidebar } from '../context/sidebar-provider'
import ExploreCard from '../components/ExploreCard'

export default function Explore() {
    const { isSidebarOpen } = useSidebar();

    return (
        <div className={`py-2 transition-all ${isSidebarOpen ? "sm:ml-64" : "sm:ml-16"}`}>
            <h2>Explore</h2>
            <div>
                <span className="pr-2">Created by:</span>
                <ul className="inline-flex gap-2">
                    <li>
                        <input checked type="checkbox" id="me-option" value="" className="hidden peer" />
                        <label htmlFor="me-option" className="inline-flex justify-center px-4 p-1 cursor-pointer border-2 border-gray-200 rounded-full dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-200 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                            <span>Me</span>
                        </label>
                    </li>
                    <li>
                        <input checked type="checkbox" id="community-option" value="" className="hidden peer" />
                        <label htmlFor="community-option" className="inline-flex justify-center px-4 py-1 cursor-pointer border-2 border-gray-200 rounded-full dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-red-200 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <span>Community</span>
                        </label>
                    </li>
                </ul>
            </div>
            <div className="mx-2 mt-4">
                <h3>Exercises</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    <ExploreCard title={"Exercise 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Exercise 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Exercise 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Exercise 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Exercise 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Exercise 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Workouts</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    <ExploreCard title={"Workout 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Workout 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Workout 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Workout 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Workout 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Workout 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Routines</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    <ExploreCard title={"Routine 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                    <ExploreCard title={"Routine 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"} />
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Plans</h3>
                <div className="flex flex-wrap justify-center sm:justify-start p-2">
                    <ExploreCard title={"Plan 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"}/>
                    <ExploreCard title={"Plan 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"}/>
                    <ExploreCard title={"Plan 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"}/>
                    <ExploreCard title={"Plan 1"} subtitle={"etw etw etw"} label={"Beginner"} link={"#"}/>
                </div>
            </div>
        </div>

    )
}