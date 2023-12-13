'use client'

import { useState, createContext, useContext } from 'react';

interface SidebarContextProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};