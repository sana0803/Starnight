import '../styles/globals.css'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>별나린밤</title>
          <link rel='icon' href="/favicon.png">
            </link>
      </Head>
      <Component {...pageProps} />
    
    </>
  )
}
export default MyApp
