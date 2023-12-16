'use client'

export default function TimeRangeSelect() {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="x-grain" className="text-gray-700 dark:text-gray-300 mr-2 font-semibold">Time Range</label>
            <select name="x-grain" id="x-grain" className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 cursor-pointer appearance-none form-select">
                <optgroup>
                    <option value="past-7">Past 7 Days</option>
                    <option value="past-28">Past 28 Days</option>
                    <option value="past-year">Past Year</option>
                    <option value="all-time">All Time</option>
                </optgroup>
                <optgroup>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="this-year">This Year</option>
                </optgroup>
                <optgroup>
                    <option value="custom">Custom Range</option>
                </optgroup>
            </select>
        </div>
    )
}