'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { GoGear } from 'react-icons/go'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { LuUser2, LuHammer, LuImport } from 'react-icons/lu'
import { MdLogout, MdOutlineSpaceDashboard, MdOutlineStackedLineChart, MdOutlineCalendarMonth } from 'react-icons/md'
import { useSidebar } from '../context/sidebar-provider'

export default function Sidebar() {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const [userMenu, setUserMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (userMenu && userMenuRef.current && !userMenuRef.current?.contains(e.target as Node)) {
            setUserMenu(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [userMenu]);

    return (
        <>
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button aria-controls="toggle-sidebar" type="button" className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" onClick={() => toggleSidebar()}>
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="/" className="flex ms-2 md:me-24 focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            <img src="https://placeholder.pics/svg/300" className="h-8 sm:me-3" alt="Fearless Fitness Tracker Logo" />
                            <span className="hidden sm:inline self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Fearless Fitness Tracker</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div>
                                <button type="button" id="user-menu-button" className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]" aria-expanded="true" aria-haspopup="true" onClick={() => setUserMenu(!userMenu)}>
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-8 h-8 rounded-full" src="https://placeholder.pics/svg/300" alt="user photo" />
                                </button>
                            </div>
                            <div ref={userMenuRef} className={`z-50 absolute origin-top-right right-0 top-10 my-4 px-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 ${userMenu ? "" : "hidden"}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                                        userName from DB
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                        userEmail from DB
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" tabIndex={-1} id="menu-item-0" onClick={() => setUserMenu(false)}>
                                            <span className="flex items-center"><LuUser2 className="mr-1" />View Profile</span>
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/account-settings" className="inline-block align-middle px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" tabIndex={-1} id="menu-item-1" onClick={() => setUserMenu(false)}>
                                            <span className="flex items-center"><GoGear className="mr-1" />Account Settings</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" tabIndex={-1} id="menu-item-3" onClick={() => setUserMenu(false)}>
                                            <span className="flex items-center"><MdLogout className="mr-1" />Sign Out</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <aside className={`fixed top-0 left-0 z-40 h-screen pt-20 bg-white border-r border-gray-200 duration-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${isSidebarOpen ? "w-64" : "-left-10 sm:left-0 w-0 sm:w-16"}`} aria-label="Sidebar">
            <img src="https://placeholder.pics/svg/300" className={`hidden sm:block absolute z-50 cursor-pointer -right-3 top-16 w-7 border-grey-800 dark:border-grey-900 border-2 rounded-full  ${!isSidebarOpen && "rotate-180"}`} onClick={() => toggleSidebar()}
            />
            <div className={`h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 ${isSidebarOpen ? "block" : "hidden sm:block"}`}>
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href="/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            <MdOutlineSpaceDashboard className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "-translate-x-0": "-translate-x-full opacity-0"}`}>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <a href="/my-workouts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            <MdOutlineStackedLineChart className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "-translate-x-0": "-translate-x-full opacity-0"}`}>My Workouts</span>
                        </a>
                    </li>
                    <li>
                        <a href="/calendar" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            <MdOutlineCalendarMonth className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "translate-x-0": "-translate-x-full opacity-0"}`}>Calendar</span>
                        </a>
                    </li>
                    <li>
                        <a href="/build-routine" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            <LuHammer className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "translate-x-0": "-translate-x-full opacity-0"}`}>Build Routine</span>
                        </a>
                    </li>
                    <li>
                        <a href="/explore" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            <FaMagnifyingGlass className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "-translate-x-0": "-translate-x-full opacity-0"}`}>Explore</span>
                        </a>
                    </li>
                    <li>
                        <a href="/reports" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            <HiOutlineDocumentReport className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "translate-x-0": "-translate-x-full opacity-0"}`}>Reports</span>
                        </a>
                    </li>
                    {/* <li>
                        <a href="/preferences" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            <LuWrench className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "-translate-x-0": "-translate-x-full opacity-0"}`}>Preferences</span>
                        </a>
                    </li> */}
                    <li>
                        <a href="/import-data" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group focus:outline-none focus:ring-2 focus:ring-[var(--accent-1)]">
                            <LuImport className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "-translate-x-0": "-translate-x-full opacity-0"}`}>Import Data</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        </>
    )
}