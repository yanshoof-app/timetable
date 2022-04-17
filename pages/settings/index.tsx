import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { buildTitleGetStaticProps } from '../../components/DocumentHead'
import Layout from '../../components/Layout'
import AdvancedEditingLink from '../../components/settings/screen/AdvancedEditingLink'
import SettingsBox from '../../components/settings/screen/SettingsBox'
import StudyGroupBox from '../../components/settings/screen/StudyGroupBox'
import Navbar from '../../components/ui/Navbar'
import { useStorage } from '../../contexts/Storage'
import { ClassLookup } from '../../utils'

export const HOURS = {
  16: '16:00',
  17: '17:00',
  18: '18:00',
  19: '19:00',
  20: '20:00',
  21: '21:00',
  22: '22:00',
  23: '23:00',
  24: 'אל תציג',
}

export const themePreferences = {
  system: 'מצב מערכת',
  light: 'בהיר',
  dark: 'כהה',
}

export const showOthersChangesText = {
  true: 'הצג',
  false: 'הסתר',
}

const Settings = () => {
  const {
    schoolName,
    grade,
    classNum,
    theme,
    updateTime,
    showOthersChanges,
    studyGroups,
  } = useStorage()
  const { push } = useRouter()

  return (
    <Layout className="flex flex-col justify-start py-4">
      <Navbar />
      <h1 className="font-bold text-4xl px-4">הגדרות</h1>
      <div className="flex flex-col gap-4 py-4 px-4 overflow-y-scroll">
        <div className="p-2 grid grid-cols-2 gap-8">
          <SettingsBox
            color="primary"
            label="כיתה ובית ספר"
            value={`${ClassLookup.getFormattedGradeName(
              grade
            )}${classNum}, ${schoolName}`}
            onClick={() => push('/settings/class')}
          />
          <SettingsBox
            color="celebration"
            label="מערכת של מחר"
            value={`${HOURS[updateTime]}`}
            onClick={() => push('/settings/updateTime')}
          />
          <SettingsBox
            color="event"
            label="מראה"
            value={`${themePreferences[theme]}`}
            onClick={() => push('/settings/theme')}
          />
          <SettingsBox
            color="change"
            label="שינויים של אחרים"
            value={`${showOthersChangesText[String(showOthersChanges)]}`}
            onClick={() => push('/settings/changes')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">קבוצות לימוד</h1>
          <div className="flex flex-col px-2 pt-2 pb-8 gap-3">
            {studyGroups && <StudyGroupBox studyGroups={studyGroups} />}
            <AdvancedEditingLink className="w-fit" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = buildTitleGetStaticProps('הגדרות')

export default Settings
