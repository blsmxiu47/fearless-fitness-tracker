import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-white dark:bg-gray-900 dark:text-white">{children}</body>
        </html>
    )
}
