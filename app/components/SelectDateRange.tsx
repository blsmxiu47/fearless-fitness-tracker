import { useState } from 'react';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export default function SelectDateRange() {
    const [startdate, setStartDate] = useState(new Date());

    return (
        <div className="flex items-center">
            <div className="relative">
                <DatePicker selected={startdate} onChange={(date) => setStartDate(date!)} />
            </div>
            <span className="mx-4 text-gray-500">to</span>
            <div className="relative">
                <DatePicker selected={startdate} onChange={(date) => setStartDate(date!)} />
            </div>
        </div>
    )
}