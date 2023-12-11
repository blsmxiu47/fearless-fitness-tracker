import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="flex justify-between">
            <Link href="#">Dashboard</Link>
            <a href="#">My Stats</a>
            <Link href="/calendar">Calendar</Link>
            <a href="#">Build Routine</a>
            <a href="#">Explore</a>
            <a href="#">Reports</a>
            <a href="#">Preferences</a>
            <Link href="/import-data">Import Data</Link>
        </footer>
    )
}