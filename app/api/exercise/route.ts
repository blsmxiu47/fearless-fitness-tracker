import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/exercise
export async function GET(req: NextRequest) {
    try {
        const exercises = await prisma.exercises.findMany({
            include: {
                types: true,
                focuses: true,
            },
            orderBy: [
                {
                    id: 'asc',
                },
            ],
        })

        return NextResponse.json(exercises, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'An error occurred handling request to get exercises.' },
            { status: 500 }
        )
    }
}