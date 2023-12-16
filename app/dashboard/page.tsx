'use client'

import '../../globals.css'
import Card from '../components/Card';
import Filter from '../components/Filter';
import LinePlot from '../charts/LinePlot';
import { useSidebar } from '../context/sidebar-provider'

export default function Home () {
    const { isSidebarOpen } = useSidebar();
    
    return (
        <div className={`py-2 transition-all ${isSidebarOpen ? "sm:ml-64" : "sm:ml-16"}`}>
                <div className="flex flex-wrap justify-center p-2">
                    <Filter />
                </div>
                <div className="flex flex-wrap my-4 px-1 w-full justify-center">
                    <Card title={"Activities"} content={<LinePlot data={[1,2,3,4]} />} />
                    <Card title={"Activities Time"} content={<LinePlot data={[1,2,3,4]} />} />
                    <Card title={"Distance"} content={<LinePlot data={[1,2,3,4]} />} />
                </div>
        </div>
    )
}