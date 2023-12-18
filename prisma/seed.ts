import { PrismaClient } from '@prisma/client'
import { exerciseData } from './seed/exercises'
import { focusData } from './seed/focuses'
import { planData } from './seed/plans'
import { routineData } from './seed/routines'
import { typeData } from './seed/types'
import { userData } from './seed/users'

const prisma = new PrismaClient()

async function main () {
  console.log('Start seeding ...')
  console.log('Seeding exercises...')
  for (const e of exerciseData) {
    const exercise = await prisma.exercise.create({
      data: e
    })
    console.log(`Created exercise with id: ${exercise.id}`)
  }
  console.log('Seeding exercises...')
  for (const t of exerciseData) {
    const exercise = await prisma.exercise.create({
      data: t
    })
    console.log(`Created exercise with id: ${exercise.id}`)
  }
  console.log('Seeding focuses...')
  for (const t of focusData) {
    const focus = await prisma.focus.create({
      data: t
    })
    console.log(`Created focus with id: ${focus.id}`)
  }
  console.log('Seeding plans...')
  for (const t of planData) {
    const plan = await prisma.plan.create({
      data: t
    })
    console.log(`Created plan with id: ${plan.id}`)
  }
  console.log('Seeding routines...')
  for (const t of routineData) {
    const routine = await prisma.routine.create({
      data: t
    })
    console.log(`Created routine with id: ${routine.id}`)
  }
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
