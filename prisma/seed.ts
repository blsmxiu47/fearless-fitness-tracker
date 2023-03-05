import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'testuser@gmail.com',
    firstName: 'MissingNo.'
  }
]

const typeData: Prisma.TypeCreateInput[] = [
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
]

const exerciseData: Prisma.ExerciseCreateInput[] = [
  {
    name: '',
    type: '',
    custom: false
  }
]

const routineData: Prisma.RoutineCreateInput[] = [
  {
    name: 'test',
    custom: false
  }
]

const planData: Prisma.PlanCreateInput[] = [
  {
    name: 'test',
    custom: false
  }
]

async function main () {
  console.log('Start seeding ...')
  console.log('Seeding users...')
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
