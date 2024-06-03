import { Head, Html, Main, NextScript } from "next/document";
import { APP_NAME } from "@/config";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{APP_NAME}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,200;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
