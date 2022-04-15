import prisma from "../../../lib/prisma"
import { nonNull, stringArg, extendType } from "nexus"

export const ProfileMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateProfile", {
      type: "Profile",
      args: {
        profileId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        username: nonNull(stringArg()),
        jobTitle: nonNull(stringArg()),
        company: nonNull(stringArg()),
        bio: nonNull(stringArg()),
        phoneNumber: nonNull(stringArg()),
        email: nonNull(stringArg()),
        countryId: nonNull(stringArg()),
        vernacularId: nonNull(stringArg()),
      },
      resolve: (
        _,
        {
          profileId,
          name,
          username,
          jobTitle,
          company,
          bio,
          phoneNumber,
          email,
          countryId,
          vernacularId,
        },
        ctx
      ) => {
        return prisma.profile.update({
          where: { id: String(profileId) },
          data: {
            name,
            username,
            jobTitle,
            company,
            bio,
            phoneNumber,
            email,
            country: {
              connect: {
                id: countryId,
              },
            },
            vernacular: {
              connect: {
                id: vernacularId,
              },
            },
          },
        })
      },
    })
  },
})
