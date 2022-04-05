import Layout from '../../components/Layout'
import AdvancedEditingLink from '../../components/settings/AdvancedEditingLink'
import SettingsBox from '../../components/settings/screen/SettingsBox'
import StudyGroupBox from '../../components/settings/StudyGroupBox'
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
    schoolName,
    theme,
    updateTime,
    showOthersChanges,
    studyGroups,
    setClassId,
    setTheme,
    setUpdateTime,
    setOthersChangesPreference,
    setStudyGroups,
    setStudyGroupMap,
  } = useStorage()

  return (
    <Layout title="הגדרות" className="flex flex-col justify-start p-4">
      <Navbar />
      <h1 className="font-bold text-4xl">הגדרות</h1>
      <div className="flex flex-col gap-4 py-4 overflow-hidden">
        <div className="p-2 grid grid-cols-2 gap-8">
          <SettingsBox
            color="primary"
            label="כיתה ובית ספר"
            value={`${'ז1,'} ${schoolName}`}
            onClick={() => {
              setClassId()
              setStudyGroups([])
              setStudyGroupMap(new Map())
            }}
          />
          <SettingsBox
            color="celebration"
            label="מערכת של מחר"
            value={`${HOURS[updateTime]}`}
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
        <div className="flex flex-col gap-2 overflow-hidden">
          <h1 className="font-bold text-2xl">קבוצות לימוד</h1>
          <div className="flex flex-col px-2 pt-2 pb-8 gap-3 overflow-hidden">
            {studyGroups && <StudyGroupBox studyGroups={studyGroups} />}
            <AdvancedEditingLink className="w-fit" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Settings
