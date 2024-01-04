import '../../globals.css'
import SettingsNav from './SettingsNav'

export default function AccountSettings() {
    return (
        <div>
            <h2>Settings</h2>
            <hr />
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="sm:col-start-1 sm:col-end-3">
                    <SettingsNav />
                </div>
                
                <div className="sm:col-start-4 sm:col-end-7">
                    Form goes here
                </div>
            </div>
        </div>
    )
}