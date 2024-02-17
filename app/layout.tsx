import Sidebar  from './components/Sidebar'
import { SidebarProvider } from './context/sidebar-provider'
import Layout from './components/Layout'
 
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <html lang="en">
                <body className="bg-[var(--theme-light-bg)] dark:bg-[var(--theme-dark-bg)] text-[var(--theme-light-text)] dark:text-[var(--theme-dark-text)]">
                    <Sidebar />
                    <main className="container mx-auto py-14 px-4">
                        <Layout>
                            {children}
                        </Layout>
                    </main>
                </body>
            </html>
        </SidebarProvider>
    )
}
