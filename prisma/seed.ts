import { PrismaClient, Prisma } from '@prisma/client'
import { exerciseData } from './seed/exercises'
import { typeData } from './seed/types'
import { userData } from './seed/users'

const prisma = new PrismaClient()

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
  console.log('Seeding exercises...')
  for (const e of exerciseData) {
    const exercise = await prisma.exercise.create({
      data: e
    })
    console.log(`Created exercise with id: ${exercise.id}`)
  }
  // console.log('Seeding types...')
  // for (const t of typeData) {
  //   const type = await prisma.type.create({
  //     data: t
  //   })
  //   console.log(`Created type with id: ${type.id}`)
  // }
  // console.log('Seeding types...')
  // for (const t of typeData) {
  //   const type = await prisma.type.create({
  //     data: t
  //   })
  //   console.log(`Created type with id: ${type.id}`)
  // }
  console.log('Seeding types...')
  for (const t of typeData) {
    const type = await prisma.type.create({
      data: t
    })
    console.log(`Created type with id: ${type.id}`)
  }
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
