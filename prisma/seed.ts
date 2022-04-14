import { PrismaClient, Prisma } from "@prisma/client"
import { faker } from "@faker-js/faker"
import moment from "moment"

const prisma = new PrismaClient()

const planTypeData: Prisma.PlanTypeCreateInput[] = [
  "BASIC",
  "TEAM",
  "ENTERPRISE",
].map(title => {
  let description = ""
  let rate = 0

  switch (title) {
    case "BASIC":
      description = "Starter plan for individuals."
      rate = 10
      break
    case "TEAM":
      description = "Collaborate up to 10 people."
      rate = 20
      break
    default:
      description = "For bigger businesses."
      rate = 40
  }

  return {
    title,
    description,
    rate,
    compoundingPeriod: "Month",
  }
})

export async function main() {
  try {
    console.log(`Start seeding ...`)

    const planTypeCreateionPromises = await Promise.all(
      planTypeData.map(async item => {
        return prisma.planType.create({
          data: item,
        })
      })
    )

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
            vernacular: {
              connectOrCreate: {
                where: {
                  title: "Malaysia",
                },
                create: {
                  title: "Malaysia",
                },
              },
            },
          },
        },
        paymentDetail: {
          create: {
            cardHolderName: name,
            cardNumber: faker.finance.creditCardNumber("visa"),
            cardCvv: faker.finance.creditCardCVV(),
            cardExpiryDate: moment().add(5, "years").toDate(),
            country: {
              connectOrCreate: {
                where: {
                  title: "Malaysia",
                },
                create: {
                  title: "Malaysia",
                },
              },
            },
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
        userSubscriptionPlan: {
          create: {
            planType: {
              connectOrCreate: {
                where: {
                  id: planTypeCreateionPromises[
                    Math.floor(Math.random() * planTypeCreateionPromises.length)
                  ].id,
                },
                create: {
                  title: "BASIC",
                  description: "Starter plan for individuals.",
                  rate: 10,
                  compoundingPeriod: "Month",
                },
              },
            },
          },
        },
      }
    })

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
