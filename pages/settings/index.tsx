import gql from "graphql-tag"

import {
  apolloClientServerSide,
  createApolloClient,
} from "../../lib/graphql/apollo-client"

export default function SettingIndexPage() {
  return null
}

export async function getServerSideProps(ctx) {
  try {
    const client = createApolloClient(ctx.req)

    const { data } = await client.query({
      query: gql`
        query User {
          showFirstUser {
            id
          }
        }
      `,
    })
    const { showFirstUser } = data

    return {
      redirect: {
        permanent: true,
        destination: `/settings/${showFirstUser.id}/account`,
      },
      props: {},
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
