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
      main: "#4f46e5",
      light: "#eef2ff",
    },
    secondary: {
      main: "#2563eb",
      light: "#89bbfb",
    },
    error: {
      main: "#ba000d",
    },
    divider: "#94a3b8",
    text: {
      secondary: "#94a3b8",
    },
  },
})
