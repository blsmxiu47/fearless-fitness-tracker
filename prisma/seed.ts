import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'testuser@gmail.com',
    firstName: 'MissingNo.'
  }
]

// const routineData: Prisma.RoutineCreateInput[] = [
//   {
//     name: 'test',
//     custom: false
//   },
// ]

// const planData: Prisma.UserCreateInput[] = [
//   {
//     name: 'test',
//     custom: false
//   },
// ]

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
