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
                <DatePicker
                    disabled={!customRange}
                    className="w-full px-4 py-2 text-[var(--theme-light-text-enabled)] disabled:text-[var(--theme-light-text-disabled)] dark:text-[var(--theme-dark-text-enabled)] disabled:dark:text-[var(--theme-dark-text-disabled)] bg-[var(--theme-light-bg-enabled)] dark:bg-[var(--theme-dark-bg-enabled)] disabled:bg-[var(--theme-light-bg-disabled)] disabled:dark:bg-[var(--theme-dark-bg-disabled)] rounded  border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 cursor-pointer disabled:cursor-auto appearance-none form-select"
                    selected={startDate}
                    onChange={(date) => onChange(date!, endDate)}
                    maxDate={new Date()}
                />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
                <DatePicker
                    disabled={!customRange}
                    className="w-full px-4 py-2 text-[var(--theme-light-text-enabled)] disabled:text-[var(--theme-light-text-disabled)] dark:text-[var(--theme-dark-text-enabled)] disabled:dark:text-[var(--theme-dark-text-disabled)] bg-[var(--theme-light-bg-enabled)] dark:bg-[var(--theme-dark-bg-enabled)] disabled:bg-[var(--theme-light-bg-disabled)] disabled:dark:bg-[var(--theme-dark-bg-disabled)] rounded  border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 cursor-pointer disabled:cursor-auto appearance-none form-select"
                    selected={endDate}
                    onChange={(date) => onChange(startDate, date!)}
                    maxDate={new Date()}
                />
            </div>
        </div>
    )
}

export default SelectDateRange