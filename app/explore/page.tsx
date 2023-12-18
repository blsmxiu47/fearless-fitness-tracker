'use client'

import '../../globals.css'
import { useSidebar } from '../context/sidebar-provider'
import ExploreCard from '../components/ExploreCard'

export default function Explore() {
    const { isSidebarOpen } = useSidebar();

    return (
        <div className={`py-2 transition-all ${isSidebarOpen ? "sm:ml-64" : "sm:ml-16"}`}>
            <h2>Explore</h2>
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