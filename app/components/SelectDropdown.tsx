'use client'

import { useEffect, useRef, useState } from 'react'

type SelectDropdownProps = {
    label: string;
    defaultOption: string;
    optionGroups: Array<[number, string[]]>;
    onChange: (option: string) => void;
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
    label,
    defaultOption,
    optionGroups,
    onChange
}) => {
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [selectedOption, setSelectedOption] = useState(defaultOption)
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownVisible && dropdownRef.current && !dropdownRef.current?.contains(e.target as Node)) {
                setDropdownVisible(false)
            }
        }

        window.addEventListener("mousedown", handleClickOutside)
        return () => window.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleOptionClick = (option: string) => {
        setSelectedOption(option)
        onChange(option)
        setDropdownVisible(false)
    }

    return (
        <div className="relative w-full">
            <div className="flex flex-col gap-1 pb-1">
                <span className="text-gray-700 dark:text-gray-300 mr-2 font-semibold">{label}</span>
                <button
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                    className="pl-4 pr-10 py-2 text-left bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 cursor-pointer appearance-none form-select"
                >
                    {selectedOption}
                </button>
            </div>
            {dropdownVisible && (
                <div
                    ref={dropdownRef}
                    className="absolute w-full px-4 py-2 z-10 bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 cursor-pointer appearance-none form-select"
                >
                    {optionGroups.map(([group, options]) => (
                        <optgroup key={group}>
                            {options.map((option, i) => (
                                <option key={i} value={option} onClick={() => handleOptionClick(option)}>
                                    {option}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectDropdown;