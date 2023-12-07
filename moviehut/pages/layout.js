import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>MovieHut</title>
        <meta name="The place to find your favorite movies and information about them." />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png"></link>
      </Head>
      {children}
    </>
  )
}
