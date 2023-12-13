import { Metadata } from 'next'
import Sidebar from './components/Sidebar'
import { SidebarProvider, useSidebar } from './context/sidebar-provider'
 
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // TODO: fix the runtime error that this causes
    // might have something to do with the fact that this is a server component,
    // but I don't like the idea of copy-pasting the same isSidebarOpen logic
    // into every single page component
    const { isSidebarOpen } = useSidebar();

    return (
        <SidebarProvider>
            <html lang="en">
                <body className="bg-white dark:bg-gray-900 dark:text-white">
                    <Sidebar />
                    <main className={`container mx-auto my-12 px-4 md:px-12 ${isSidebarOpen ? "ml-16" : "ml-64"}`}>
                        {children}
                    </main>
                </body>
            </html>
        </SidebarProvider>
    )
}
