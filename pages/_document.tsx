import { AppProps } from "next/app"
import Document, { Html, Head, Main, NextScript } from "next/document"
import createEmotionServer from "@emotion/server/create-instance"
import createEmotionCache from "../lib/utility/createEmotionCache"

interface ExtendedAppType extends AppProps {
  emotionCache: any
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App =>
          function EnhanceApp(props: ExtendedAppType) {
            return <App emotionCache={cache} {...props} />
          },
      })

    const initialProps = await Document.getInitialProps(ctx)

    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        data-emotion={`${style.key} ${style.ids.join(" ")}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))

    return { ...initialProps, emotionStyleTags }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content="HackerTrail Assesment" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
