import Head from 'next/head'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Home () {
  return (
    <Layout>
      <Head>
        <title>Fearless Fitness Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto my-12 px-4 md:px-12">
        <a href="/api/auth/login">Login</a>
        <h1 className="text-lg">
          Fearless Fitness Tracker
        </h1>
        <div className="flex flex-wrap -mx-2 lg:-mx-4">
          <div className="my-4 px-1 w-full">
            <div className="overflow-hidden rounded-lg shadow-lg my-2 md:my-4 lg:my-8">
              <div className="grid items-center justify-items-center p-4 md:p-8">
                <h2 className="text-md">Activities</h2>
                <div className="box-content">pyo</div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg my-2 md:my-4 lg:my-8">
              <div className="grid items-center justify-items-center p-4 md:p-8">
                <h2 className="text-md">Activities Time</h2>
                <div className="box-content">pyo</div>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg my-2 md:my-4 lg:my-8">
              <div className="grid items-center justify-items-center p-4 md:p-8">
                <h2 className="text-md">Distance</h2>
                <div className="box-content">pyo</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex justify-between">
        <Link href="#">Dashboard</Link>
        <a href="#">My Stats</a>
        <a href="#">Calendar</a>
        <a href="#">Build Routine</a>
        <a href="#">Explore</a>
        <a href="#">Reports</a>
        <a href="#">Preferences</a>
        <Link href="/import-data">Import Data</Link>
      </footer>
    </Layout>
  )
}
