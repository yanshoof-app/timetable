import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StorageProvider from '../contexts/Storage'
import FullTimetableProvider from '../contexts/FullTimetable'
import TimetableInit from '../components/timetable/TimetableInit'
import {
  ClassExists,
  UpdateTimeExists,
  SchoolExists,
  TimetableIsSaved,
} from '../contexts/Storage/wrappers'
import TimetableProvider, { NoProblemsInSettings } from '../contexts/Timetable'
import FetchingTimetable from '../components/ui/LoadingScreens/FetchingTimetable'
import { ClassInit, SchoolInit, UpdateTimeInit } from '../components/settings'
import ClassLookupProvider from '../contexts/ClassLookup'
import TimetableUpdatesProvider from '../contexts/Updates'
import { LoadingScreenWrapper } from '../contexts/LoadingScreenWrapper'
import DocumentHead from '../components/DocumentHead'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DocumentHead title={pageProps.title}>
      <LoadingScreenWrapper>
        <StorageProvider>
          <SchoolExists orElse={SchoolInit}>
            <ClassLookupProvider>
              <ClassExists orElse={ClassInit}>
                <FullTimetableProvider>
                  <TimetableProvider>
                    <TimetableIsSaved orElse={FetchingTimetable}>
                      <NoProblemsInSettings orElse={TimetableInit}>
                        <UpdateTimeExists orElse={UpdateTimeInit}>
                          <TimetableUpdatesProvider>
                            <Component {...pageProps} />
                          </TimetableUpdatesProvider>
                        </UpdateTimeExists>
                      </NoProblemsInSettings>
                    </TimetableIsSaved>
                  </TimetableProvider>
                </FullTimetableProvider>
              </ClassExists>
            </ClassLookupProvider>
          </SchoolExists>
        </StorageProvider>
      </LoadingScreenWrapper>
    </DocumentHead>
  )
}

export default MyApp
