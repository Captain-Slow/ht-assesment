import prisma from "../../../lib/prisma"
import { nonNull, stringArg, extendType } from "nexus"

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("signupUser", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      resolve: (_, { username, email }, ctx) => {
        return prisma.user.create({
          data: {
            profile: {
              create: {
                username,
                email,
              },
            },
          },
        })
      },
    })
  },
})
