import { Prisma } from '@prisma/client'

export const typeData: Prisma.TypeCreateInput[] = [
    {
      name: 'Cardio',
      custom: false
    },
    {
      name: 'Core',
      custom: false
    },
    {
      name: 'Gym',
      custom: false
    },
    {
      name: 'HIIT',
      custom: false
    },
    {
      name: 'Lifting',
      custom: false
    },
    {
      name: 'Pilates',
      custom: false
    },
    {
      name: 'Running',
      custom: false
    },
    {
      name: 'Strength Training',
      custom: false
    },
    {
      name: 'Swimming',
      custom: false
    },
    {
      name: 'Walking',
      custom: false
    },
    {
      name: 'Yoga',
      custom: false
    }
  ];