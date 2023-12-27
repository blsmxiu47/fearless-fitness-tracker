import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/routine
export async function GET(req: NextRequest) {
    try {
        const routines = await prisma.routines.findMany({
            select: {
                id: true,
                user_id: true,
                name: true
            },
            orderBy: [
                {
                    id: 'asc',
                },
            ],
        })
        return NextResponse.json(routines, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'An error occurred handling request to get routines.' },
            { status: 500 }
        )
    }
}