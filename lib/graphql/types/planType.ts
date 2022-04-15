import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const PlanType = objectType({
  name: "PlanType",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("title")
    t.nonNull.string("description")
    t.nullable.float("rate")
    t.nullable.string("compoundingPeriod")
    t.list.field("userSubscriptionPlans", {
      type: "UserSubscriptionPlan",
      resolve: parent =>
        prisma.planType
          .findUnique({
            where: { id: String(parent.id) },
          })
          .userSubscriptionPlans(),
    })
  },
})
