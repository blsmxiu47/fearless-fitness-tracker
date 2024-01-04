export default function SettingsNav() {
    return (
        <nav className="p-2">
            <ul className="flex flex-col gap-2" role="tablist">
                <li className="list-none cursor-pointer hover:underline active:underline underline-offset-2" role="tab">
                    Display Preferences
                </li>
                <li className="list-none cursor-pointer hover:underline active:underline underline-offset-2" role="tab">
                    Account Information
                </li>
            </ul>
        </nav>
    )
}