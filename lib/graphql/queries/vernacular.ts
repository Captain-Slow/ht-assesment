import prisma from "../../../lib/prisma"
import { extendType } from "nexus"

export const VernacularQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allVernacular", {
      type: "Vernacular",
      resolve: (_, args) => {
        return prisma.vernacular.findMany({
          orderBy: [
            {
              title: "asc",
            },
          ],
        })
      },
    })
  },
})
