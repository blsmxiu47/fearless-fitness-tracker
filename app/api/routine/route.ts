import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/routine
export async function GET(req: NextRequest) {
    try {
        const routines = await prisma.routines.findMany({
            select: {
                id: true,
                user_id: true,
                name: true,
                duration: true,
                frequency: true,
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

// POST /api/routine
export async function POST(req: NextRequest) {
    // TODO: replace localhost
    const res = await fetch('http://localhost:3000/api/routine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
    })
}