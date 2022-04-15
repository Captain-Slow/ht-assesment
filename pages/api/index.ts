import { ApolloServer } from "apollo-server-micro"
import { DateTimeResolver } from "graphql-scalars"
import { NextApiHandler } from "next"
import { asNexusMethod, makeSchema } from "nexus"
import path from "path"
import cors from "micro-cors"

import { User } from "../../lib/graphql/types/user"
import { PaymentDetail } from "../../lib/graphql/types/paymentDetail"
import { Profile } from "../../lib/graphql/types/profile"
import { PlanType } from "../../lib/graphql/types/planType"
import { UserSubscriptionPlan } from "../../lib/graphql/types/userSubscriptionPlan"
import { NotificationSetting } from "../../lib/graphql/types/notificationSetting"
import { Country } from "../../lib/graphql/types/country"
import { Vernacular } from "../../lib/graphql/types/vernacular"
import { UserQuery } from "../../lib/graphql/queries/user"
import { PlanTypeQuery } from "../../lib/graphql/queries/planType"
import { ProfileQuery } from "../../lib/graphql/queries/profile"
import { NotificationSettingQuery } from "../../lib/graphql/queries/notificationSetting"
import { UserMutation } from "../../lib/graphql/mutations/user"
import { ProfileMutation } from "../../lib/graphql/mutations/profile"
import { UserSubscriptionPlanMutation } from "../../lib/graphql/mutations/userSubscriptionPlan"
import { PaymentDetailMutation } from "../../lib/graphql/mutations/paymentDetail"
import { NotificationSettingMutation } from "../../lib/graphql/mutations/notificationSetting"

export const GQLDate = asNexusMethod(DateTimeResolver, "date")

export const schema = makeSchema({
  types: [
    UserQuery,
    PlanTypeQuery,
    ProfileQuery,
    NotificationSettingQuery,
    UserMutation,
    ProfileMutation,
    UserSubscriptionPlanMutation,
    PaymentDetailMutation,
    NotificationSettingMutation,
    User,
    Profile,
    PaymentDetail,
    Country,
    PlanType,
    NotificationSetting,
    UserSubscriptionPlan,
    Vernacular,
    GQLDate,
  ],
  outputs: {
    typegen: path.join(process.cwd(), "generated/nexus-typegen.ts"),
    schema: path.join(process.cwd(), "generated/schema.graphql"),
  },
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({ schema })

let apolloServerHandler: NextApiHandler

async function getApolloServerHandler() {
  if (!apolloServerHandler) {
    await apolloServer.start()

    apolloServerHandler = apolloServer.createHandler({
      path: "/api",
    })
  }

  return apolloServerHandler
}

const handler: NextApiHandler = async (req, res) => {
  const apolloServerHandler = await getApolloServerHandler()

  if (req.method === "OPTIONS") {
    res.end()
    return
  }

  return apolloServerHandler(req, res)
}

export default cors()(handler)
