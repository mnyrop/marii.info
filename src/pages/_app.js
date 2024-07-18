import "@/styles/globals.css";

import React from 'react'
import Head from 'next/head'
 
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Marii Nyrop</title>
        <link rel="shortcut icon" href="/icon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
 
export default MyApp