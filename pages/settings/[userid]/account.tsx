import gql from "graphql-tag"
import { Box, Typography } from "@mui/material"

import { apolloClientServerSide } from "../../../lib/graphql/apollo-client"
import SettingLayout from "../../../components/SettingLayout"

export default function UserSettingsAccountPage({ user }) {
  return (
    <Box>
      <SettingLayout page="account" userId={user.id}>
        <Box></Box>
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
        destination: `/500`,
      },
      props: {},
    }
  }
}
