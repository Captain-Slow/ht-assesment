import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: "/api",
})

export const apolloClientServerSide = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache({
    addTypename: false,
  }),
  uri: "http://localhost:4001/api",
})

export function createApolloClient(req) {
  return new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: "http://localhost:4001/api",
      credentials: "same-origin",
      headers: {
        cookie: req.headers.cookie,
      },
    }),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  })
}
