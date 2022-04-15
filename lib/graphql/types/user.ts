import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("id")
    t.nullable.field("profile", {
      type: "Profile",
      resolve: parent =>
        prisma.user
          .findUnique({
            where: { id: String(parent.id) },
          })
          .profile(),
    })
    t.nullable.field("paymentDetail", {
      type: "PaymentDetail",
      resolve: parent =>
        prisma.user
          .findUnique({
            where: { id: String(parent.id) },
          })
          .paymentDetail(),
    })
    t.nullable.field("notificationSetting", {
      type: "NotificationSetting",
      resolve: parent =>
        prisma.user
          .findUnique({
            where: { id: String(parent.id) },
          })
          .notificationSetting(),
    })
    t.nullable.field("userSubscriptionPlan", {
      type: "UserSubscriptionPlan",
      resolve: parent =>
        prisma.user
          .findUnique({
            where: { id: String(parent.id) },
          })
          .userSubscriptionPlan(),
    })
    t.date("createdAt")
    t.date("updatedAt")
  },
})
