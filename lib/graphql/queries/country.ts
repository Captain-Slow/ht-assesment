import prisma from "../../../lib/prisma"
import { extendType } from "nexus"

export const CountryQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("allCountry", {
      type: "Country",
      resolve: (_, args) => {
        return prisma.country.findMany({
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
