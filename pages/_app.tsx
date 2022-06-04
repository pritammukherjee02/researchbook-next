import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import { motion } from "framer-motion"

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
      <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Component {...pageProps} />
      </motion.div>
    </SessionProvider>
  )
}

export default MyApp
