import prisma from "../../../lib/prisma"
import { objectType } from "nexus"

export const NotificationSetting = objectType({
  name: "NotificationSetting",
  definition(t) {
    t.nonNull.string("id")
    t.nonNull.boolean("communicationAlert")
    t.nonNull.boolean("securityAlert")
    t.nonNull.boolean("meetupAlert")
    t.nonNull.boolean("itemCommentAlert")
    t.nonNull.boolean("mentionAlert")
    t.nonNull.boolean("followAlert")
    t.nonNull.boolean("repliesAlert")
    t.nullable.field("user", {
      type: "User",
      resolve: parent =>
        prisma.notificationSetting
          .findUnique({
            where: { id: String(parent.id) },
          })
          .user(),
    })
    t.date("createdAt")
    t.date("updatedAt")
  },
})
