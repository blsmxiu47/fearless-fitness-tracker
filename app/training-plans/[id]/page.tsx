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
            <h2>{plan.name}</h2>
            <p>{plan.duration}</p>
            <p>{plan.frequency}</p>
            {/* tags */}
            <div className="flex gap-2">
                {plan.tags.map((tag: string, i: number) => (
                    <span key={i} className="px-4 py-2 text-xs bg-gray-300 dark:bg-gray-700 rounded-lg">{tag}</span>
                ))}
            </div>
            <div>
                {/* This is where the table-like calendar will go with tabs for weeks */}
            </div>
        </div>
    )
}