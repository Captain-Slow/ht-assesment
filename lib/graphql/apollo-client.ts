import { ApolloClient, InMemoryCache } from "@apollo/client"

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: "/api",
})

export const apolloClientServerSide = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: process.env.API_PATH,
})
