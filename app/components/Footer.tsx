import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img 
                        // src="/fft-logo.svg" 
                        src="https://placeholder.pics/svg/300"
                        className="h-8" alt="Fearless Fitness Tracker Logo" />
                        <span className="self-center font-semibold whitespace-nowrap dark:text-white">Fearless Fitness Tracker</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link href="#">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="#">My Stats</Link>
                        </li>
                        <li>
                            <Link href="/calendar">Calendar</Link>
                        </li>
                        <li>
                            <Link href="#">Build Routine</Link>
                        </li>
                        <li>
                            <Link href="#">Explore</Link>
                        </li>
                        <li>
                            <Link href="#">Reports</Link>
                        </li>
                        <li>
                            <Link href="#">Preferences</Link>
                        </li>
                        <li>
                            <Link href="/import-data">Import Data</Link>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 Wes Warriner. All Rights Reserved.</span>
            </div>
        </footer>
    )
}