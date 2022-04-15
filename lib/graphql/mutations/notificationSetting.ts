import prisma from "../../../lib/prisma"
import { nonNull, stringArg, booleanArg, extendType } from "nexus"

export const NotificationSettingMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateNotificationSetting", {
      type: "NotificationSetting",
      args: {
        notificationSettingId: nonNull(stringArg()),
        communicationAlert: nonNull(booleanArg()),
        securityAlert: nonNull(booleanArg()),
        meetupAlert: nonNull(booleanArg()),
        itemCommentAlert: nonNull(booleanArg()),
        mentionAlert: nonNull(booleanArg()),
        followAlert: nonNull(booleanArg()),
        repliesAlert: nonNull(booleanArg()),
      },
      resolve: (
        _,
        {
          notificationSettingId,
          communicationAlert,
          securityAlert,
          meetupAlert,
          itemCommentAlert,
          mentionAlert,
          followAlert,
          repliesAlert,
        },
        ctx
      ) => {
        return prisma.notificationSetting.update({
          where: { id: String(notificationSettingId) },
          data: {
            communicationAlert,
            securityAlert,
            meetupAlert,
            itemCommentAlert,
            mentionAlert,
            followAlert,
            repliesAlert,
          },
        })
      },
    })
  },
})
