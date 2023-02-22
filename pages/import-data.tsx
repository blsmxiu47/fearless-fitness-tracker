import Head from 'next/head';
import Link from "next/link";
import Layout from '../components/layout';

export default function ImportData() {
    return (
        <Layout>
            <Head>
                <title>Import Data</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Import Data</h1>
            <p>Import data from other accounts or reports exported from other activity trackers such as Garmin Connect, Fitbit, or Strava.</p>
            <p>Accepted file extensions: .xls, .xlsx, or .csv</p>
            <footer>
                <Link href="/">Dashboard</Link>
                <a href="#">My Stats</a>
                <a href="#">Calendar</a>
                <a href="#">Build Routine</a>
                <a href="#">Explore</a>
                <a href="#">Reports</a>
                <a href="#">Preferences</a>
                <Link href="#">Import Data</Link>
            </footer>
        </Layout>
    );
}