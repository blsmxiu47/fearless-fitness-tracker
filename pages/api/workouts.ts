import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { Workout } from '../../lib/types';

const prisma = new PrismaClient();

async function handle(req: NextApiRequest, res: NextApiResponse, userId: string): Promise<void> {
    try {
        const workouts = await prisma.workout.findMany({
            where: {
                userId: userId,
            },
        });
        return res.json(workouts);
    } catch (error) {
        return res.status(500).json({ message: 'Unable to fetch workouts.' });
    }
}