import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider } from "@emotion/react"
import { createTheme } from "@mui/material/styles"

import createEmotionCache from "../lib/utility/createEmotionCache"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "/api",
})

const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ba000d",
    },
  },
})
