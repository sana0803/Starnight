import '../styles/globals.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { NextSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>별나린밤</title>
          <link rel='icon' href="/favicon.png">
            </link>
      </Head>
      <NextSeo
        title="별나린밤"
        description="A short description goes here."
      />
      <Component {...pageProps} />
    
    </>
  )
}
export default MyApp
