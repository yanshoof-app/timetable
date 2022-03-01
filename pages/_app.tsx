import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StorageProvider from '../contexts/Storage'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StorageProvider>
      <Component {...pageProps} />
    </StorageProvider>
  )
}

export default MyApp
