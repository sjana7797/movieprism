import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://dummyimage.com" />
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://s4.anilist.co" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link
          rel="prefetch"
          as="font"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
