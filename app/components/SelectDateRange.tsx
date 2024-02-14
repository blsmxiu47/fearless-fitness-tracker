import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

type SelectDateRangeProps = {
    customRange: boolean;
    startDate: Date;
    endDate: Date;
    onChange: (startDate: Date, endDate: Date) => void;
}

const SelectDateRange: React.FC<SelectDateRangeProps> = ({
    customRange = false,
    startDate = new Date(),
    endDate = new Date(),
    onChange
}) => {

    return (
        <div className="relative w-full">
            <div className="relative flex items-center">
                <DatePicker disabled={!customRange} className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:dark:bg-gray-900 disabled:dark:text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 cursor-pointer appearance-none form-select" selected={startDate} onChange={(date) => onChange(date!, endDate)} />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
                <DatePicker disabled={!customRange} className="w-full px-4 py-2 rounded bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-700 dark:text-gray-300 disabled:dark:bg-gray-900 disabled:dark:text-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 cursor-pointer appearance-none form-select" selected={endDate} onChange={(date) => onChange(startDate, date!)} />
            </div>
        </div>
    )
}

export default SelectDateRange