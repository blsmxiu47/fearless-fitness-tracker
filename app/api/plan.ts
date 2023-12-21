import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// GET /api/plan
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const result = await prisma.plan.findMany({
            orderBy: [
                {
                    id: 'asc',
                },
            ],
        })
        return res.status(200).json(result)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'An error occurred handling request.' })
    }
}