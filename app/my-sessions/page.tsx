import Link from 'next/link'
import { LuImport } from 'react-icons/lu'

import MyRunsTable from './MyRunsTable'
import MyWorkoutsTable from './MyWorkoutsTable'
import '../../globals.css'

export default function MySessions() {
    return (
        <div>
            <div className="px-2 py-4 flex flex-col sm:flex-row sm:flex-wrap justify-between sm:items-center">
                <h2 className="py-2">My Sessions</h2>
                <div className="flex flex-wrap sm:flex-row gap-2 text-xs">
                        <button className="px-4 py-2 font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            + Add Session
                        </button>
                        <button className="px-4 py-2 font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            Export CSV
                        </button>
                        <Link href="/import-data" className="flex border rounded-md gap-2 px-4 py-2 font-medium">
                            <LuImport className="w-4 h-4 inline" />Import Sessions
                        </Link>
                </div>
            </div>
            <div className="py-8 flex flex-col sm:flex-row sm:flex-wrap justify-between text-xs">
                {/* TODO: add toggle to switch between runs and workouts */}
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
            <div className="overflow-x-auto">
                {/* table of results from prisma, with pagination. Sorting control as part of table header row. */}
                <MyRunsTable />
                <MyWorkoutsTable />
            </div>
        </div>
    )
}