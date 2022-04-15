import prisma from "../../../lib/prisma"
import { extendType } from "nexus"

export const PlanTypeQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allPlanType", {
      type: "PlanType",
      resolve: (_, args) => {
        return prisma.planType.findMany()
      },
    })
  },
})
