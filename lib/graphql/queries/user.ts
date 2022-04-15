import prisma from "../../../lib/prisma"
import { extendType, nonNull, stringArg } from "nexus"

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allUser", {
      type: "User",
      resolve: (_, args) => {
        return prisma.user.findMany()
      },
    })
    t.field("userById", {
      type: "User",
      args: {
        userId: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.user.findUnique({
          where: { id: String(args.userId) },
        })
      },
    })
    t.field("showFirstUser", {
      type: "User",
      resolve: (_, args) => {
        return prisma.user.findFirst()
      },
    })
  },
})
