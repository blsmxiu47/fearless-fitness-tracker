import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

// GET /api/type
export async function GET(req: NextRequest) {
    try {
        const types = await prisma.types.findMany({
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
        return NextResponse.json(types, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'An error occurred handling request to get types.' },
            { status: 500 }
        )
    }
}