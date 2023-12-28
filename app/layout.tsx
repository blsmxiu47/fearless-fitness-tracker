import Sidebar  from './components/Sidebar'
import { SidebarProvider, useSidebar } from './context/sidebar-provider'
import Layout from './components/Layout'
 
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <html lang="en">
                <body className="bg-white dark:bg-gray-900 dark:text-white">
                    <Sidebar />
                    <main className="container mx-auto my-14 px-4">
                        <Layout>
                            {children}
                        </Layout>
                    </main>
                </body>
            </html>
        </SidebarProvider>
    )
}
