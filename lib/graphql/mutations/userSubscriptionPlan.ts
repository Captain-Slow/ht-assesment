import prisma from "../../../lib/prisma"
import { nonNull, stringArg, extendType } from "nexus"

export const UserSubscriptionPlanMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateUserSubscriptionPlan", {
      type: "UserSubscriptionPlan",
      args: {
        userSubscriptionPlanId: nonNull(stringArg()),
        planTypeId: nonNull(stringArg()),
      },
      resolve: (_, { userSubscriptionPlanId, planTypeId }, ctx) => {
        return prisma.userSubscriptionPlan.update({
          where: { id: String(userSubscriptionPlanId) },
          data: {
            planType: {
              connect: {
                id: planTypeId,
              },
            },
          },
        })
      },
    })
  },
})
