import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const UserSubscriptionPlan = objectType({
  name: "UserSubscriptionPlan",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.field("user", {
      type: "User",
      resolve: parent =>
        prisma.userSubscriptionPlan
          .findUnique({
            where: { id: String(parent.id) },
          })
          .user(),
    })
    t.nonNull.field("planType", {
      type: "PlanType",
      resolve: parent =>
        prisma.userSubscriptionPlan
          .findUnique({
            where: { id: String(parent.id) },
          })
          .planType(),
    })
    t.date("createdAt")
    t.date("updatedAt")
  },
})
