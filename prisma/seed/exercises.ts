import { Prisma } from '@prisma/client'

export const exerciseData: Prisma.ExerciseCreateInput[] = [
    {
      name: 'VMO lifts',
      type: 'Strength Training',
      custom: false
    }
  ]