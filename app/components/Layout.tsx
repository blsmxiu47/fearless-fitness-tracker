'use client'

import { useSidebar } from '../context/sidebar-provider'
 
export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isSidebarOpen } = useSidebar();

    return (
        <div className={`py-2 transition-all ${isSidebarOpen ? "sm:ml-64" : "sm:ml-16"}`}>
            {children}
        </div>
    )
}
