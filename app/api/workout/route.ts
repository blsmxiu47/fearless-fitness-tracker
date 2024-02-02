import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/workout
export async function GET(req: NextRequest) {
    try {
        const workouts = await prisma.workouts.findMany({
            include: {
                types: true,
                workout_exercises: {
                    include: {
                        exercises: true,
                    },
                }
            },
            orderBy: [
                {
                    id: 'asc',
                },
            ],
        })
        return NextResponse.json(workouts, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'An error occurred handling request to get workouts.' },
            { status: 500 }
        )
    }
}