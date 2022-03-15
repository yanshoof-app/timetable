import Layout from '../../components/Layout'
import SettingsBox from '../../components/settings/screen/SettingsBox'
import StudyGroupsBox from '../../components/settings/StudyGroupsBox'
import PageTitle from '../../components/ui/PageTitle'
import { useStorage } from '../../contexts/Storage'
import { THEME_OPTIONS } from '../../contexts/Storage/types'
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
  24: '00:00',
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
  const { school, classId, theme, updateTime, showOthersChanges, studyGroups } =
    useStorage()
  return (
    <Layout
      title="הגדרות"
      className="flex w-screen flex-col justify-start h-screen p-4"
    >
      <h1 className="font-bold text-5xl">הגדרות</h1>
      <div className="flex flex-col gap-2">
        <div className="p-4 grid grid-cols-2 gap-8">
          <SettingsBox
            color="primary"
            label="כיתה ובית ספר"
            value={`${'ז1,'} ${'עמי אסף בית ברל'}`}
          />
          <SettingsBox
            color="celebration"
            label="מערכת של מחר"
            value={`מהשעה ${HOURS[updateTime]}`}
          />
          <SettingsBox
            color="event"
            label="מצב כהה"
            value={`${themePreferences[theme]}`}
          />
          <SettingsBox
            color="change"
            label="שינויים של אחרים"
            value={`${showOthersChangesText[String(showOthersChanges)]}`}
          />
        </div>
        <h1 className="font-bold text-3xl">קבוצות לימוד</h1>
        <div>
          <StudyGroupsBox
            studyGroups={[{ subject: 'מתמטיקה 5', teacher: 'חווה' }]}
          ></StudyGroupsBox>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
