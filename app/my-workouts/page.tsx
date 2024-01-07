import Link from 'next/link'
import { LuImport } from 'react-icons/lu'

import '../../globals.css'

export default function MyWorkouts() {
    return (
        <div>
            <div className="mx-2 my-4 flex flex-col sm:flex-row sm:flex-wrap justify-between sm:items-center">
                <h2 className="py-2">My Workouts</h2>
                <div className="flex flex-wrap sm:flex-row gap-2 text-xs">
                        <button className="px-4 py-2 font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            + Add Workout
                        </button>
                        <button className="px-4 py-2 font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            Export CSV
                        </button>
                        <Link href="/import-data" className="flex border rounded-md gap-2 px-4 py-2 font-medium">
                            <LuImport className="w-4 h-4 inline" />Import Workouts
                        </Link>
                </div>
            </div>
            <div className="my-8 flex flex-col sm:flex-row sm:flex-wrap justify-between text-xs">
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2">
                    <div>
                        Search bar
                    </div>
                    <div>
                        DATE FILTER
                    </div>
                    <div>
                        TYPE FILTER
                    </div>
                </div>
            </div>
            <div>
                table of results from prisma, with pagination. Sorting control as part of table header row.
                {/* <MyWorkoutsTable /> */}
            </div>
        </div>
    )
}