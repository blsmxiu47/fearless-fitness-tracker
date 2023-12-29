import { plan_days, plans } from '@prisma/client';
import '../../../globals.css'

export async function generateStaticParams() {
    try {
        const res = await fetch(
            'http://localhost:3000/api/plan',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
        if (!res.ok) throw new Error(res.statusText)
        const plans = await res.json()
        return plans.map((plan: plans) => ({
            params: {
                plan: {
                    id: plan.id.toString(),
                    name: plan.name,
                    description: plan.description,
                    duration: plan.duration,
                    frequency: plan.frequency,
                    tags: plan.tags,
                }
            }
        }))
    } catch (error) {
        console.error('fetch error:', error)
        throw error;
    }
}

export default async function TrainingPlan({ params }: { params: {
    plan: plans;
    id: string;
    name: string;
    description: string;
    duration: string;
    frequency: string;
    tags: string[];
    planDays: plan_days[]
}}) {
    const getPlan = async (id: string) => {
        try {
            const res = await fetch(
                'http://localhost:3000/api/plan?id=' + id,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            )
            if (!res.ok) throw new Error(res.statusText)
            return await res.json()
        } catch (error) {
            console.error('fetch error:', error)
            throw error;
        }
    }
    const res = await getPlan(params.id);
    const plan = res[0];

    return (
        <div>
            <h2 className="px-2 py-4 text-lg font-semibold">{plan.name} Training Plan</h2>
            <div className="my-2">
                <table className="my-2">
                    <thead>
                        <tr className="text-md font-semibold text-left text-gray-700 dark:text-gray-700 bg-gray-100 border-b border-gray-600">
                            <th className="px-4 py-3">Plan Details</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-1">Duration</td>
                            <td className="px-4 py-1">{plan.duration}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-1">Frequency</td>
                            <td className="px-4 py-1">{plan.frequency}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-1">Tags</td>
                            <td className="px-4 py-1">
                                <div className="flex gap-2">
                                    {plan.tags.map((tag: string, i: number) => (
                                        <span key={i} className="px-4 py-2 text-xs bg-gray-300 dark:bg-gray-700 rounded-lg">{tag}</span>
                                    ))}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-4 py-1">Description</td>
                            <td className="px-4 py-1">{plan.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div> 
            <div className="my-2">
                {/* This is where the table-like calendar will go with tabs for weeks */}
                <table className="w-full">
                    <thead>
                        <tr className="text-md font-semibold text-left text-gray-700 dark:text-gray-700 bg-gray-100 border-b border-gray-600">
                            <th className="px-4 py-3">Summary</th>
                            <th className="px-4 py-3">Session 1</th>
                            <th className="px-4 py-3">Session 2</th>
                            <th className="px-4 py-3">Total Distance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plan.plan_days.map((day: plan_days, i: number) => (
                            <tr key={i}>
                                <td className="px-4 py-3">{day.description}</td>
                                <td className="px-4 py-3">{day.session_a}</td>
                                <td className="px-4 py-3">{day.session_b}</td>
                                <td className="px-4 py-3">{day.total_distance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}