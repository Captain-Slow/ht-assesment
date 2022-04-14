import { PrismaClient, Prisma } from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

const userData = Array.from({ length: 5 + 1 }, (n, i) => i).map(() => {
  const name = faker.internet.userName()

  return {
    email: faker.internet.email(),
    profile: {
      create: {
        username: name,
        name: faker.name.findName(),
        jobTitle: faker.name.jobTitle(),
        company: faker.company.companyName(),
        bio: faker.lorem.paragraphs(3),
      },
    },
    paymentDetail: {
      create: {
        cardHolderName: name,
      },
    },
    notificationSetting: {
      communicationAlert: true,
      securityAlert: true,
      mentionAlert: true,
      followAlert: true,
      repliesAlert: true,
    },
  }
})

// Prisma.UserCreateInput[]

export async function main() {
  try {
    console.log(`Start seeding ...`)
    for (const u of userData) {
      const user = await prisma.user.create({
        data: u,
      })
      console.log(`Created user with id: ${user.id}`)
    }
    console.log(`Seeding finished.`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
