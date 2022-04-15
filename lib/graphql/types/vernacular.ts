import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const Vernacular = objectType({
  name: "Vernacular",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("title")
    t.list.field("profiles", {
      type: "Profile",
      resolve: parent =>
        prisma.vernacular
          .findUnique({
            where: { id: String(parent.id) },
          })
          .profiles(),
    })
  },
})
