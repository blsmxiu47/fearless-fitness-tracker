export default function Card (fn: {
    title: string,
    content: React.ReactNode
}) {
    return (
        <div className="flex bg-white dark:bg-gray-800 justify-center p-2 m-2 overflow-hidden rounded-lg">
            <div className="flex flex-col items-center">
                <span className="text-md font-semibold">{fn.title}</span>
                <div className="box-content">
                    {fn.content}
                </div>
            </div>
        </div>
    )
}