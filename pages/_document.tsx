import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="http://via.placeholder.com" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://s4.anilist.co" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
