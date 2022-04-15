import gql from "graphql-tag"

import { apolloClientServerSide } from "../../../lib/graphql/apollo-client"

export default function UserSettingsAccountPage({ user }) {
  console.log(user)
  return <div></div>
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
