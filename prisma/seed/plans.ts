import { Prisma } from '@prisma/client'

export const planData: Prisma.PlanCreateInput[] = [
    {
      name:   'Beginner 5k Training Plan',
      custom: false,
    }
  ]