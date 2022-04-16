import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const Country = objectType({
  name: "Country",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.string("title")
    t.nonNull.string("code")
    t.list.field("paymentDetails", {
      type: "PaymentDetail",
      resolve: parent =>
        prisma.country
          .findUnique({
            where: { id: String(parent.id) },
          })
          .paymentDetails(),
    })
    t.list.field("profiles", {
      type: "Profile",
      resolve: parent =>
        prisma.country
          .findUnique({
            where: { id: String(parent.id) },
          })
          .profiles(),
    })
  },
})
