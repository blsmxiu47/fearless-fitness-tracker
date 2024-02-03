'use client'

import '../globals.css'

export default function Home () {
    return (
        <div>
            <div className="flex flex-wrap px-2 lg:px-4">
                <div className="px-1 py-4 w-full">
                    <div className="overflow-hidden rounded-lg shadow-lg my-2 md:my-4 lg:my-8">
                        <div className="grid items-center justify-items-center p-4 md:p-8">
                            <h2 className="text-md">Activities</h2>
                            <div className="box-content">pyo</div>
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
