import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StorageProvider from '../contexts/Storage'
import FullTimetableProvider from '../contexts/FullTimetable'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StorageProvider>
      <FullTimetableProvider>
        <Component {...pageProps} />
      </FullTimetableProvider>
    </StorageProvider>
  )
}

export default MyApp
