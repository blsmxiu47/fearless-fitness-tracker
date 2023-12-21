import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

// POST /api/user
// Required fields in body: email, firstName
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const result = await prisma.users.create({
        data: {
            ...req.body,
        },
    })

    return res.status(201).json(result)
}