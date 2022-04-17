import prisma from "../../../lib/prisma"
import { nonNull, stringArg, extendType } from "nexus"
import moment from "moment"

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
        zipCode: nonNull(stringArg()),
        countryId: nonNull(stringArg()),
      },
      resolve: (
        _,
        {
          paymentDetaild,
          cardHolderName,
          cardNumber,
          cardExpiryDate,
          zipCode,
          countryId,
        },
        ctx
      ) => {
        return prisma.paymentDetail.update({
          where: { id: String(paymentDetaild) },
          data: {
            cardHolderName,
            cardNumber,
            cardExpiryDate: moment(cardExpiryDate, "DD/MM/YYYY").toDate(),
            zipCode,
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
