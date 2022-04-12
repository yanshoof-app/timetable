import OthersChangesSetting from './OthersChangesSetting'
import ClassSetting from './ClassSetting'
import SchoolSetting from './SchoolSetting'
import ThemeSetting from './ThemeSetting'
import UpdateTimeSetting from './UpdateTimeSetting'
import asPage from './layout/asPage'

const WELCOME_TITLE = 'ברוכים הבאים'
const INIT_PAGE_PROPS = {
  hidePageTitle: true,
  centerContent: true,
  title: WELCOME_TITLE,
}

export const SchoolInit = asPage(
  SchoolSetting,
  INIT_PAGE_PROPS,
  ({ school, schoolName, setSchool, setSchoolName }) => ({
    value: { symbol: Number(school), name: schoolName },
    save: ({ symbol, name }) => {
      setSchool(symbol.toString())
      setSchoolName(name)
    },
  })
)

export const SchoolSettingPage = asPage(
  SchoolSetting,
  { title: 'בחר בית ספר', centerContent: true },
  ({ school, schoolName, setSchool, setSchoolName }, router) => ({
    value: { symbol: Number(school), name: schoolName },
    save: ({ symbol, name }) => {
      setSchool(symbol.toString())
      setSchoolName(name)
      router.push('/settings/class')
    },
  })
)

export const ClassInit = asPage(
  ClassSetting,
  INIT_PAGE_PROPS,
  ({ classId, setClassId, setSchool }) => ({
    value: { grade: 10, classNum: 7, classId }, // TODO: Save grade and classNum
    save: ({ grade, classNum, classId }) => {
      setClassId(classId)
    },
    onSchoolEditClick: () => setSchool(),
  })
)

export const UpdateTimeInit = asPage(
  UpdateTimeSetting,
  INIT_PAGE_PROPS,
  ({ updateTime, setUpdateTime }) => ({
    value: updateTime,
    save: setUpdateTime,
  })
)

export const UpdateTimeSettingPage = asPage(
  UpdateTimeSetting,
  { title: 'מערכת של מחר', centerContent: true },
  ({ updateTime, setUpdateTime }, router) => ({
    value: updateTime,
    save: (value) => {
      setUpdateTime(value)
      router.push('/settings')
    },
  })
)

export const ThemeSettingPage = asPage(
  ThemeSetting,
  { title: 'מראה' },
  ({ theme, setTheme }, router) => ({
    value: theme,
    save: (value) => {
      setTheme(value)
      router.push('/settings')
    },
  })
)
