import { ApolloClient, InMemoryCache } from "@apollo/client"

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api",
})

export const apolloClientServerSide = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.API_PATH,
})
