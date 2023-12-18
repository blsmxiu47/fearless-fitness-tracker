'use client'

import '../../globals.css'
import { useSidebar } from '../context/sidebar-provider'
import Card from '../components/Card'

export default function Explore() {
    const { isSidebarOpen } = useSidebar();

    return (
        <div className={`py-2 transition-all ${isSidebarOpen ? "sm:ml-64" : "sm:ml-16"}`}>
            <h2>Explore</h2>
            <div className="mx-2 mt-4">
                <h3>Exercises</h3>
                <div className="flex flex-wrap p-2 gap-4">
                    <Card title={"Exercise 1"} content={<div>Exercise 1</div>} />
                    <Card title={"Exercise 1"} content={<div>Exercise 1</div>} />
                    <Card title={"Exercise 1"} content={<div>Exercise 1</div>} />
                    <Card title={"Exercise 1"} content={<div>Exercise 1</div>} />
                    <Card title={"Exercise 1"} content={<div>Exercise 1</div>} />
                    <Card title={"Exercise 1"} content={<div>Exercise 1</div>} />
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Workouts</h3>
                <div className="flex flex-wrap p-2 gap-4">
                    <Card title={"Workout 1"} content={<div>Workout 1</div>} />
                    <Card title={"Workout 1"} content={<div>Workout 1</div>} />
                    <Card title={"Workout 1"} content={<div>Workout 1</div>} />
                    <Card title={"Workout 1"} content={<div>Workout 1</div>} />
                    <Card title={"Workout 1"} content={<div>Workout 1</div>} />
                    <Card title={"Workout 1"} content={<div>Workout 1</div>} />
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Routines</h3>
                <div className="flex flex-wrap p-2 gap-4">
                    <Card title={"Routine 1"} content={<div>Routine 1</div>} />
                    <Card title={"Routine 1"} content={<div>Routine 1</div>} />
                </div>
            </div>
            <div className="mx-2 mt-4">
                <h3>Plans</h3>
                <div className="flex flex-wrap p-2 gap-4">
                    <Card title={"Plan 1"} content={<div>Plan 1</div>}/>
                    <Card title={"Plan 1"} content={<div>Plan 1</div>}/>
                    <Card title={"Plan 1"} content={<div>Plan 1</div>}/>
                    <Card title={"Plan 1"} content={<div>Plan 1</div>}/>
                </div>
            </div>
        </div>

    )
}