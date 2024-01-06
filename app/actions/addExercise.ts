'use server';

import prisma from '../../lib/prisma';
import { revalidatePath } from 'next/cache';

export const addExercise = async (formData: FormData) => {
    const name = formData.get('name');
    const sets = parseInt(formData.get('sets') as string);
    const duration = formData.get('duration');
    const reps = formData.get('reps');
    const weight = formData.get('weight');
    const rest = formData.get('rest');
    const type = formData.get('type');
    const focus = formData.get('focus');
    const notes = formData.get('notes');

    // Validate type is in database
    const types = await prisma.types.findMany({
        select: {
            name: true,
        },
    });
    const typeNames = types.map((type) => type.name);
    if (!typeNames.includes(type as string)) {
        throw new Error('Invalid type');
    }

    await prisma.exercises.create({
        // TODO
        data: {
            name: name as string,
            sets: sets,
            duration: duration as string,
            reps: reps as string,
            weight: weight as string,
            rest: rest as string,
            types: {
                connect: {
                    name: type as string,
                },
            },
            focuses: {
                connect: {
                    name: focus as string,
                },
            },
            notes: notes as string,
        },
    });

    revalidatePath('/exercises');
}