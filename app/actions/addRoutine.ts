'use server';

import { revalidatePath } from 'next/cache';

import prisma from '../../lib/prisma';

export const addRoutine = async (formData: FormData) => {
    const user_id = 1; // TODO: get user_id from session

    const name = formData.get('name');
    const duration = formData.get('duration');
    const frequency = formData.get('frequency');
    const typeInput = formData.get('type');

    const types = await prisma.types.findMany({
        select: {
            id: true,
            user_id: true,
            name: true,
        },
    });
    const typeNames = types.map((type) => type.name);
    if (!typeNames.includes(typeInput as string)) {
        console.log('Type not in database');
    }

    const type = {
        id: types.find((type) => type.name === typeInput)?.id as number,
        user_id: user_id,
        name: typeInput as string,
    }

    const newRoutineData = {
        name: name as string,
        duration: duration as string,
        frequency: frequency as string,
        type: type,
    }

    await prisma.routines.create({
        data: {
            created_at: new Date(),
            updated_at: new Date(),
            ...newRoutineData,
        },
    });

    revalidatePath('/routines');
};
