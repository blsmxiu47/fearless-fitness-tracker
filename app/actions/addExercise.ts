'use server';

import { revalidatePath } from 'next/cache';

import prisma from '../../lib/prisma';
import { Focus } from '../../lib/types';

export const addExercise = async (formData: FormData) => {
    const user_id = 1; // TODO: get user_id from session
    let sets = 1;

    const name = formData.get('name');
    const setsInput = parseInt(formData.get('sets') as string);
    const duration = formData.get('duration');
    const reps = formData.get('reps');
    const weight = formData.get('weight');
    const rest = formData.get('rest');
    const focusInput = formData.get('focus');
    const notes = formData.get('notes');

    if (!setsInput === null) {
        sets = setsInput;
    }
    if (duration === '' && reps === '' && weight === '') {
        console.log('At least one of duration, reps, or weight must be specified');
    }


    // Validate focus is in database
    const focuses = await prisma.focuses.findMany({
        select: {
            id: true,
            user_id: true,
            name: true,
        },
    });
    const focusNames = focuses.map((focus) => focus.name);
    if (!focusNames.includes(focusInput as string)) {
        console.log('Focus not in database');
    }

    const focus: Focus = {
        id: focuses.find((focus) => focus.name === focusInput)?.id as number,
        user_id: user_id,
        name: focusInput as string,
    }

    const newExerciseData = {
        name: name as string,
        sets: sets,
        duration: duration as string,
        reps: reps as string,
        weight: weight as string,
        rest: rest as string,
        focus: focus,
        notes: notes as string,
    }

    await prisma.exercises.create({
        data: {
            created_at: new Date(),
            updated_at: new Date(),
            ...newExerciseData,
        }
    });

    revalidatePath('/exercises');
}