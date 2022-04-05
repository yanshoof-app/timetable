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
import TimetableProvider, {
  NoProblemsInSettings,
  TimetableIsSaved,
} from '../contexts/Timetable'
import SchoolPick from '../components/settings/SchoolPick'
import FetchingTimetable from '../components/ui/LoadingScreens/FetchingTimetable'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StorageProvider>
      <SchoolExists orElse={SchoolPick}>
        <ClassExists orElse={ClassPick}>
          <FullTimetableProvider>
            <TimetableProvider>
              <TimetableIsSaved orElse={FetchingTimetable}>
                <NoProblemsInSettings orElse={TimetableInit}>
                  <UpdateTimeExists orElse={UpdateHourPick}>
                    <ThemePreferenceExists orElse={ThemePreferencePick}>
                      <OthersChangesPreferenceExists orElse={OthersChangesPick}>
                        <Component {...pageProps} />
                      </OthersChangesPreferenceExists>
                    </ThemePreferenceExists>
                  </UpdateTimeExists>
                </NoProblemsInSettings>
              </TimetableIsSaved>
            </TimetableProvider>
          </FullTimetableProvider>
        </ClassExists>
      </SchoolExists>
    </StorageProvider>
  )
}

export default MyApp
