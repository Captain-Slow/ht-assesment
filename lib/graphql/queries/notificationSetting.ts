import prisma from "../../../lib/prisma"
import { extendType, stringArg, nonNull } from "nexus"

export const NotificationSettingQuery = extendType({
  type: "Query",
  definition(t) {
    t.field("notificationSettingById", {
      type: "NotificationSetting",
      args: {
        notificationSettingId: nonNull(stringArg()),
      },
      resolve: (_, args) => {
        return prisma.notificationSetting.findUnique({
          where: { id: String(args.notificationSettingId) },
        })
      },
    })
  },
})
