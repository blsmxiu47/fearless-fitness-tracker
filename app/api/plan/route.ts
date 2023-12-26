import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/plan
export async function GET(req: NextRequest) {
    try {
        const plans = await prisma.plans.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                duration: true,
                frequency: true,
                tags: true,
            },
            orderBy: [
                {
                    id: 'asc',
                },
            ],
        })
        return NextResponse.json(plans, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'An error occurred handling request to get plans.' },
            { status: 500 }
        )
    }
}