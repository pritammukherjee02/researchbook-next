import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'

import ProgressBar from '@badrap/bar-of-progress'

import { SessionProvider } from "next-auth/react"

const progress = new ProgressBar({
  size: 4,
  color: '#60A5FA',
  //color: '#FE595E',
  className: 'z-50',
  delay: 100,
})

Router.events.on('routeChangeStart', progress.start)
Router.events.on('routeChangeComplete', progress.finish)
Router.events.on('routeChangeError', progress.finish)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
