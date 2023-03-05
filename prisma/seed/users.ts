import { Prisma } from '@prisma/client'

export const userData: Prisma.UserCreateInput[] = [
    {
      email: 'testuser@gmail.com',
      firstName: 'MissingNo.'
    }
  ]