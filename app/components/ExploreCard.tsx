import Link from 'next/link'

export default function ExploredCard (fn: {
    title: string,
    subtitle: string,
    label: string,
    link: string
}) {
    return (
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 max-w-[240px]">
            <Link href={fn.link}>
                <div className="relative flex h-40 bg-white dark:bg-gray-800 justify-center p-2 m-2 overflow-hidden rounded-lg">
                    <div className="absolute top-0 right-0 bg-red-200 text-white text-xs px-2 py-1 rounded-bl-lg">
                        {fn.label}
                    </div>
                    <div className="flex flex-col items-center pt-4">
                        <span className="text-md font-semibold">{fn.title}</span>
                        <div className="">
                            <span className="text-sm text-gray-500">{fn.subtitle}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}