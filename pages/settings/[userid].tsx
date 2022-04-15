import { useRouter } from "next/router"
import Layout from "../../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"

const UserQuery = gql`
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
`

export default function UserSettingsPage() {
  const router = useRouter()

  const { loading, error, data } = useQuery(UserQuery, {
    fetchPolicy: "cache-and-network",
    variables: { userId: router.query["userid"] },
  })
  console.log(data)

  return <div></div>
}
