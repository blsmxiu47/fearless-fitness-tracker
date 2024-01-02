import '../../globals.css'

export default function BuildRoutine() {
    return (
        <div>
            <h2 className="my-2 text-lg">Build a Routine</h2>
            <form className="mx-2">
                <h3 className="my-2">Summary</h3>
                <div className="flex flex-col mx-2 max-w-[768px] text-xs sm:text-sm md:text-md">
                    <div className="flex items-center gap-2 my-2">
                        <label className="w-36" htmlFor="routine-name">Routine Name</label>
                        <input className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-3)]" type="text" name="routine-name" id="routine-name" placeholder='e.g. "Core A"' />
                    </div>
                    <div className="flex items-center gap-2 my-2">
                        <label className="w-36" htmlFor="routine-duration">Duration</label>
                        <input className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-3)]" type="text" name="routine-duration" id="routine-duration" placeholder='e.g. "30 minutes"' />
                    </div>
                    <div className="flex items-center gap-2 my-2">
                        <label className="w-36" htmlFor="routine-frequency">Frequency</label>
                        <input className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-3)]" type="text" name="routine-frequency" id="routine-frequency" placeholder='e.g. "2 sessions per week"' />
                    </div>
                    <div className="flex items-center gap-2 my-2">
                        <label className="w-36" htmlFor="routine-focus">Focus</label>
                        <input className="w-full pl-2 pr-6 py-2 overflow-hidden dark:bg-gray-800 rounded-md focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--accent-3)]" type="text" name="routine-focus" id="routine-focus" placeholder='e.g. "Stability"' />
                    </div>
                </div>
                <h3 className="my-2">Exercises</h3>
                <div className="mx-2">
                    <button className="px-4 py-2 my-2 text-sm font-medium text-white bg-[var(--accent-1)] rounded-md hover:bg-[var(--accent-2)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-3)]">+ Add Exercise</button>
                </div>
            </form>
        </div>
    )
}