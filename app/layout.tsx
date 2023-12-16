import { Metadata } from 'next'
import Sidebar from './components/Sidebar'
import { SidebarProvider } from './context/sidebar-provider'
 
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
    // May not be possible here. the below line needs to be wrapped in
    // SidebarProvider as well... but this is the root layout...
    // const { isSidebarOpen } = useSidebar();

    return (
        <SidebarProvider>
            <html lang="en">
                <body className="bg-white dark:bg-gray-900 dark:text-white">
                    <Sidebar />
                    <main className="container mx-auto my-14 px-4">
                        {children}
                    </main>
                </body>
            </html>
        </SidebarProvider>
    )
}
