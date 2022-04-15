import prisma from "../../../lib/prisma"
import { extendType, nonNull, stringArg } from "nexus"

export const ProfileQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("profileByUsername", {
      type: "Profile",
      args: {
        username: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.profile.findUnique({
          where: { username: String(args.username) },
        })
      },
    })
    t.field("profileById", {
      type: "Profile",
      args: {
        profileId: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.profile.findUnique({
          where: { id: String(args.profileId) },
        })
      },
    })
  },
})
