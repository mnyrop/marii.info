import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{backgroundColor: '#191510'}}>
      <Head/>
      <body className="bg-bg text-text min-h-dvh" >
        <div className="w-full h-24 bg-[url('/img/banner.png')]"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
