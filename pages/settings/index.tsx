import Layout from '../../components/Layout'
import AdvancedEditingLink from '../../components/settings/AdvancedEditingLink'
import SettingsBox from '../../components/settings/screen/SettingsBox'
import StudyGroupsBox from '../../components/settings/StudyGroupsBox'
import Navbar from '../../components/ui/Navbar'
import { useStorage } from '../../contexts/Storage'

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
    theme,
    updateTime,
    showOthersChanges,
    studyGroups,
    setClassId,
    setTheme,
    setUpdateTime,
    setOthersChangesPreference,
  } = useStorage()

  return (
    <Layout
      title="הגדרות"
      className="flex w-screen flex-col justify-start h-screen p-4"
    >
      <Navbar />
      <h1 className="font-bold text-5xl">הגדרות</h1>
      <div className="flex flex-col gap-4 py-4">
        <div className="p-2 grid grid-cols-2 gap-8">
          <SettingsBox
            color="primary"
            label="כיתה ובית ספר"
            value={`${'ז1,'} ${'עמי אסף בית ברל'}`}
            onClick={() => setClassId()}
          />
          <SettingsBox
            color="celebration"
            label="מערכת של מחר"
            value={`מהשעה ${HOURS[updateTime]}`}
            onClick={() => setUpdateTime()}
          />
          <SettingsBox
            color="event"
            label="מראה"
            value={`${themePreferences[theme]}`}
            onClick={() => setTheme()}
          />
          <SettingsBox
            color="change"
            label="שינויים של אחרים"
            value={`${showOthersChangesText[String(showOthersChanges)]}`}
            onClick={() => setOthersChangesPreference()}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-3xl">קבוצות לימוד</h1>
          <div className="flex flex-col px-2 py-2 gap-3">
            {studyGroups && <StudyGroupsBox studyGroups={studyGroups} />}
            <AdvancedEditingLink />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Settings