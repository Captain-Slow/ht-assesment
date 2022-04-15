import Layout from "../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"

const FeedQuery = gql`
  query FeedQuery {
    allUser {
      id
      email
      profile {
        username
        name
      }
    }
  }
`

export default function SettingPage() {
  const { loading, error, data } = useQuery(FeedQuery, {
    fetchPolicy: "cache-and-network",
  })
  console.log(data)

  return <div></div>
}
