import gql from "graphql-tag"
import { Box } from "@mui/material"

import { apolloClientServerSide } from "../../../lib/graphql/apollo-client"
import SettingLayout from "../../../components/layouts/SettingLayout"
import AccountForm from "../../../components/page/account/AccountForm"
import { BASIC_USER_DATA_TYPE } from "../../../lib/data/types/user"

interface propTypes {
  user: BASIC_USER_DATA_TYPE
}

export default function UserSettingsAccountPage({ user }: propTypes) {
  return (
    <Box>
      <SettingLayout page="account" userId={user.id}>
        <AccountForm userData={user} />
      </SettingLayout>
    </Box>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const userId = query["userid"]

    const { data } = await apolloClientServerSide.query({
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
        permanent: true,
        destination: `/404`,
      },
      props: {},
    }
  }
}
