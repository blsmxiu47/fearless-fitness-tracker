'use server';

import prisma from '../../../lib/prisma';

import { TimeSeriesResult } from '../../../lib/types';

export default async function getSessionCounts() {
    const result = await prisma.$queryRaw<TimeSeriesResult[]>`
        SELECT
            DATE(datetime) as date,
            EXTRACT(YEAR FROM datetime)::int as year,
            EXTRACT(MONTH FROM datetime)::int as month,
            To_Char(datetime, 'Dy') as dayofweek,
            COUNT(*)::int as value FROM runs GROUP BY datetime ORDER BY datetime
    `;

    return result;
}