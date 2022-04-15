import prisma from "../../../lib/prisma"
import { nonNull, stringArg, extendType } from "nexus"

export const PaymentDetailMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updatePaymentDetail", {
      type: "PaymentDetail",
      args: {
        paymentDetaild: nonNull(stringArg()),
        cardHolderName: nonNull(stringArg()),
        cardNumber: nonNull(stringArg()),
        cardExpiryDate: nonNull(stringArg()),
        countryId: nonNull(stringArg()),
      },
      resolve: (
        _,
        {
          paymentDetaild,
          cardHolderName,
          cardNumber,
          cardExpiryDate,
          countryId,
        },
        ctx
      ) => {
        return prisma.paymentDetail.update({
          where: { id: String(paymentDetaild) },
          data: {
            cardHolderName,
            cardNumber,
            cardExpiryDate,
            country: {
              connect: {
                id: countryId,
              },
            },
          },
        })
      },
    })
  },
})
