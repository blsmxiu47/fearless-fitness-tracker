import { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
 
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
        <UserProvider>
            <html lang="en">
                <body>{children}</body>
            </html>
        </UserProvider>
    )
}
