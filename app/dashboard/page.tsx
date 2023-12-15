'use client'

import '../../globals.css'
import LinePlot from '../charts/LinePlot';
import { useSidebar } from '../context/sidebar-provider'

export default function Home () {
    const { isSidebarOpen } = useSidebar();
    
    return (
        <div className={`transition-all ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
            <div className="flex flex-wrap -mx-2 lg:-mx-4">
                <div className="my-4 px-1 w-full">
                    <div className="overflow-hidden rounded-lg shadow-lg my-2 md:my-4 lg:my-8">
                        <div className="grid items-center justify-items-center p-4 md:p-8">
                            <h2 className="text-md">Activities</h2>
                            <div className="box-content">
                                <LinePlot data={[1,2,3,4]}/>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg my-2 md:my-4 lg:my-8">
                        <div className="grid items-center justify-items-center p-4 md:p-8">
                            <h2 className="text-md">Activities Time</h2>
                            <div className="box-content">pyo</div>
                        </div>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-lg my-2 md:my-4 lg:my-8">
                        <div className="grid items-center justify-items-center p-4 md:p-8">
                            <h2 className="text-md">Distance</h2>
                            <div className="box-content">pyo</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}