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
        if (userMenu && userMenuRef.current && !userMenuRef.current?.contains(e.target as Node) && e.currentTarget !== document.getElementById('user-menu-button') && e.target !== document.getElementById('user-menu-button-img')) {
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
        <nav className="fixed top-0 z-50 w-full bg-[var(--theme-light-bg-2)] border-b border-gray-200 dark:bg-[var(--theme-dark-bg-2)] dark:border-[var(--theme-dark-border)]">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button aria-controls="toggle-sidebar" type="button" className="inline-flex items-center p-1 text-sm text-gray-500 rounded-lg sm:hidden hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" onClick={() => toggleSidebar()}>
                            <span className="sr-only">Open sidebar</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                            </svg>
                        </button>
                        <a href="/" className="flex ms-2 md:me-24 rounded focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                            <img src="https://placeholder.pics/svg/300" className="h-8 sm:me-3 rounded" alt="Fearless Fitness Tracker Logo" />
                            <span className="hidden sm:inline self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)]">Fearless Fitness Tracker</span>
                        </a>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div>
                                <button type="button" id="user-menu-button" className="flex text-sm bg-[var(--theme-light-bg-2)] dark:bg-[var(--theme-dark-bg-2)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" aria-expanded="true" aria-haspopup="true" onClick={() => setUserMenu(!userMenu)}>
                                    <span className="sr-only">Open user menu</span>
                                    <img id="user-menu-button-img" className="w-8 h-8 rounded-full" src="https://placeholder.pics/svg/300" alt="user photo" />
                                </button>
                            </div>
                            <div ref={userMenuRef} className={`z-50 absolute origin-top-right right-0 top-14 py-4 px-2 text-base list-none divide-y divide-gray-100 border border-[var(--theme-light-border)] dark:border-[var(--theme-dark-border)] rounded-b shadow bg-[var(--theme-light-bg-2)] dark:bg-[var(--theme-dark-bg-2)] dark:divide-gray-600 ${userMenu ? "" : "hidden"}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)]" role="none">
                                        userName from DB
                                    </p>
                                    <p className="text-sm font-medium truncate text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)]" role="none">
                                        userEmail from DB
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <Link href="/profile" className="block px-4 py-2 text-sm text-[var(--theme-light-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:text-[var(--theme-dark-text-2)] dark:hover:text-var[(--theme-dark-text-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)]" role="menuitem" tabIndex={-1} id="menu-item-0" onClick={() => setUserMenu(false)}>
                                            <span className="flex items-center"><LuUser2 className="mr-1" />View Profile</span>
                                            
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/account-settings" className="inline-block align-middle px-4 py-2 text-sm text-[var(--theme-light-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:text-[var(--theme-dark-text-2)] dark:hover:text-var[(--theme-dark-text-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)]" role="menuitem" tabIndex={-1} id="menu-item-1" onClick={() => setUserMenu(false)}>
                                            <span className="flex items-center"><GoGear className="mr-1" />Account Settings</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/logout" className="block px-4 py-2 text-sm text-[var(--theme-light-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:text-[var(--theme-dark-text-2)] dark:hover:text-var[(--theme-dark-text-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)]" role="menuitem" tabIndex={-1} id="menu-item-3" onClick={() => setUserMenu(false)}>
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

        <aside className={`fixed top-0 left-0 z-40 h-full pt-20 bg-[var(--theme-light-bg-2)] border-r border-[var(--theme-light-border)] duration-200 sm:translate-x-0 dark:bg-[var(--theme-dark-bg-2)] dark:border-[var(--theme-dark-border)] ${isSidebarOpen ? "w-64" : "-left-10 sm:left-0 w-0 sm:w-16"}`} aria-label="Sidebar">
            <img src="https://placeholder.pics/svg/300" className={`hidden sm:block absolute z-50 cursor-pointer -right-3 top-16 w-7 border-[var(--theme-light-border)] dark:border-[var(--theme-dark-border)] border-2 rounded-full  ${!isSidebarOpen && "rotate-180"}`} onClick={() => toggleSidebar()}
            />
            <div className={`h-full pt-2 px-3 pb-4 overflow-y-hidden bg-[var(--theme-light-bg-2)] dark:bg-[var(--theme-dark-bg-2)] ${isSidebarOpen ? "block" : "hidden sm:block"}`}>
                <ul className="font-medium">
                    <li className="py-2">
                        <Link href="/dashboard" className="flex items-center p-2 rounded-lg text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)] group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                            <MdOutlineSpaceDashboard className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "-translate-x-0": "-translate-x-full opacity-0"}`}>Dashboard</span>
                        </Link>
                    </li>
                    <li className="py-2">
                        <a href="/my-sessions" className="flex items-center p-2 rounded-lg text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)] group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                            <MdOutlineStackedLineChart className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "-translate-x-0": "-translate-x-full opacity-0"}`}>My Sessions</span>
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/calendar" className="flex items-center p-2 rounded-lg text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)] group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                            <MdOutlineCalendarMonth className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "translate-x-0": "-translate-x-full opacity-0"}`}>Calendar</span>
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/build-routine" className="flex items-center p-2 rounded-lg text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)] group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                            <LuHammer className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "translate-x-0": "-translate-x-full opacity-0"}`}>Build Routine</span>
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/explore" className="flex items-center p-2 rounded-lg text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)] group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                            <FaMagnifyingGlass className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "-translate-x-0": "-translate-x-full opacity-0"}`}>Explore</span>
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/reports" className="flex items-center p-2 rounded-lg text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)] group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                            <HiOutlineDocumentReport className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "translate-x-0": "-translate-x-full opacity-0"}`}>Reports</span>
                        </a>
                    </li>
                    <li className="py-2">
                        <a href="/import-data" className="flex items-center p-2 rounded-lg text-[var(--theme-light-text-2)] dark:text-[var(--theme-dark-text-2)] hover:text-[var(--theme-light-text-2-hover)] hover:bg-[var(--theme-light-bg-2-hover)] dark:hover:bg-[var(--theme-dark-bg-2-hover)] group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                            <LuImport className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white" />
                            <span className={`inline-flex items-center ms-3 h-5 transition-all overflow-clip ${isSidebarOpen? "-translate-x-0": "-translate-x-full opacity-0"}`}>Import Data</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        </>
    )
}