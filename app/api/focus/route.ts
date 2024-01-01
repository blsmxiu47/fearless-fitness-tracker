import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/focus
export async function GET(req: NextRequest) {
    try {
        const focuses = await prisma.focuses.findMany({
            select: {
                id: true,
                user_id: true,
                name: true,
            },
            orderBy: [
                {
                    id: 'asc',
                },
            ],
        })        
        return NextResponse.json(focuses, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'An error occurred handling request to get focuses.' },
            { status: 500 }
        )
    }
}