import { PrismaClient, Prisma } from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = Array.from(
  { length: 5 + 1 },
  (n, i) => i
).map(() => {
  const name = faker.name.findName()

  return {
    email: faker.internet.email(),
    profile: {
      create: {
        username: faker.internet.userName(),
        name: name,
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
      create: {
        communicationAlert: true,
        securityAlert: true,
        mentionAlert: true,
        followAlert: true,
        repliesAlert: true,
      },
    },
  }
})

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
