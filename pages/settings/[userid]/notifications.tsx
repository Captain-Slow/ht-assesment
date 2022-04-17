import gql from "graphql-tag"
import { Box } from "@mui/material"

import { createApolloClient } from "../../../lib/graphql/apollo-client"
import SettingLayout from "../../../components/layouts/SettingLayout"
import NotificationsForm from "../../../components/page/notifications/NotificationsForm"
import { BASIC_USER_DATA_TYPE } from "../../../lib/data/types/user"

interface propTypes {
  user: BASIC_USER_DATA_TYPE
}

export default function UserSettingsNotificationsPage({ user }: propTypes) {
  return (
    <Box>
      <SettingLayout page="notifications" userId={user.id}>
        <NotificationsForm userData={user} />
      </SettingLayout>
    </Box>
  )
}

export async function getServerSideProps({ query, req }) {
  try {
    const client = createApolloClient(req)

    const userId = query["userid"]

    const { data } = await client.query({
      variables: {
        userId,
      },
      query: gql`
        query UserQuery($userId: String!) {
          userById(userId: $userId) {
            id
            profile {
              id
              email
              username
              name
              jobTitle
              company
              bio
              vernacular {
                id
              }
              country {
                id
              }
              phoneNumber
            }
            userSubscriptionPlan {
              id
              planType {
                id
              }
            }
            paymentDetail {
              id
              cardNumber
              cardHolderName
              cardExpiryDate
              cardCvv
              zipCode
              country {
                id
              }
            }
            notificationSetting {
              id
              communicationAlert
              securityAlert
              meetupAlert
              itemCommentAlert
              mentionAlert
              followAlert
              repliesAlert
            }
          }
        }
      `,
    })
    const { userById } = data

    return {
      props: {
        user: {
          ...userById,
        },
      },
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: `/404`,
      },
      props: {},
    }
  }
}
