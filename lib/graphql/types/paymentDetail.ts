import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const PaymentDetail = objectType({
  name: "PaymentDetail",
  definition(t) {
    t.nonNull.string("id")
    t.nullable.string("cardHolderName")
    t.nullable.string("cardNumber")
    t.nullable.date("cardExpiryDate")
    t.nullable.string("cardCvv")
    t.nullable.string("zipCode")
    t.nullable.field("country", {
      type: "Country",
      resolve: parent =>
        prisma.paymentDetail
          .findUnique({
            where: { id: String(parent.id) },
          })
          .country(),
    })
    t.nullable.field("user", {
      type: "User",
      resolve: parent =>
        prisma.paymentDetail
          .findUnique({
            where: { id: String(parent.id) },
          })
          .user(),
    })
  },
})
