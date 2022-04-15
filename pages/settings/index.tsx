import gql from "graphql-tag"

import { apolloClientServerSide } from "../../lib/graphql/apollo-client"

export default function SettingIndexPage() {
  return null
}

export async function getServerSideProps() {
  try {
    const { data } = await apolloClientServerSide.query({
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
        permanent: true,
        destination: `/404`,
      },
      props: {},
    }
  }
}
