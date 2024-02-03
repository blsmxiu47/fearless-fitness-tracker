import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/run
export async function GET(req: NextRequest) {
    try {
        const runs = await prisma.runs.findMany({
            include: {
                shoes: true,
            },
            orderBy: [
                {
                    id: 'asc',
                },
            ],
        })
        return NextResponse.json(runs, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'An error occurred handling request to get runs.' },
            { status: 500 }
        )
    }
}