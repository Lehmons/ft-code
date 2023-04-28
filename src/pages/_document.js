import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import Script from "next/script";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon-16x16.png"
          />
          <link rel="manifest" href="/images/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/images/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
         
          <link
            rel="preload"
            href="/fonts/akzidenz-grotesk-pro-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <meta property="og:locale" content="en_GB" />
          <meta property="og:title" content="Alistair Gibbs" />
          <meta property="og:description" content="Alistair Gibbs" />
          <meta property="og:image" content="/images/social-share.jpg" />
          <meta property="og:url" content="https://atma.world" />
          <meta property="og:site_name" content="Alistair Gibbs" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:description" content="Alistair Gibbs" />
          <meta name="twitter:title" content="Alistair Gibbs" />
          {/* <meta property="og:video" content="/videos/social-share.mp4" />
          <meta property="og:video" content="/videos/social-share.mp4" />
          <meta
            property="og:video:secure_url"
            content="/videos/social-share.mp4"
          />
          <meta property="og:video:type" content="video/mp4" />
          <meta property="og:video:width" content="1920" />
          <meta property="og:video:height" content="1080" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
