import '../globals.css'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'


export const metadata = {
  title: 'Fearless Fitness Tracker'
}

export default function Home () {
  return (
    <>
        <link rel="icon" href="/favicon.ico" />

        <Sidebar />

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
        <Footer />
    </>
  )
}
