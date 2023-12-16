'use client'

export default function TimeUnitSelect() {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="x-grain" className="text-gray-700 dark:text-gray-300 mr-2 font-semibold">Time Series Unit</label>
            <select name="x-grain" id="x-grain" className="bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 appearance-none form-select">
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
            </select>
        </div>
    )
}