import '../styles/globals.css'
import type { AppProps } from 'next/app'
import StorageProvider from '../contexts/Storage'
import FullTimetableProvider from '../contexts/FullTimetable'
import ClassPick from '../components/settings/ClassPick'
import OthersChangesPick from '../components/settings/OthersChangesPick'
import ThemePreferencePick from '../components/settings/ThemePreferencePick'
import UpdateHourPick from '../components/settings/UpdateHourPick'
import TimetableInit from '../components/timetable/TimetableInit'
import {
  ClassExists,
  UpdateTimeExists,
  ThemePreferenceExists,
  OthersChangesPreferenceExists,
  SchoolExists,
} from '../contexts/Storage/wrappers'
import TimetableProvider, { NoProblemsInSettings } from '../contexts/Timetable'
import SchoolPick from '../components/settings/SchoolPick'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StorageProvider>
      <SchoolExists fallback={SchoolPick}>
        <ClassExists fallback={ClassPick}>
          <FullTimetableProvider>
            <TimetableProvider>
              <NoProblemsInSettings fallback={TimetableInit}>
                <UpdateTimeExists fallback={UpdateHourPick}>
                  <ThemePreferenceExists fallback={ThemePreferencePick}>
                    <OthersChangesPreferenceExists fallback={OthersChangesPick}>
                      <Component {...pageProps} />
                    </OthersChangesPreferenceExists>
                  </ThemePreferenceExists>
                </UpdateTimeExists>
              </NoProblemsInSettings>
            </TimetableProvider>
          </FullTimetableProvider>
        </ClassExists>
      </SchoolExists>
    </StorageProvider>
  )
}

export default MyApp
