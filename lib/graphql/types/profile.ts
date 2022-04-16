import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("email")
    t.string("username")
    t.nullable.string("name")
    t.nullable.string("jobTitle")
    t.nullable.string("company")
    t.nullable.string("bio")
    t.nullable.string("phoneNumber")
    t.nullable.field("user", {
      type: "User",
      resolve: parent =>
        prisma.profile
          .findUnique({
            where: { id: String(parent.id) },
          })
          .user(),
    })
    t.nullable.field("vernacular", {
      type: "Vernacular",
      resolve: parent =>
        prisma.profile
          .findUnique({
            where: { id: String(parent.id) },
          })
          .vernacular(),
    })
    t.nullable.field("country", {
      type: "Country",
      resolve: parent =>
        prisma.profile
          .findUnique({
            where: { id: String(parent.id) },
          })
          .country(),
    })
    t.date("createdAt")
    t.date("updatedAt")
  },
})
