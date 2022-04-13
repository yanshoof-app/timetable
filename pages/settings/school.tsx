import asPage from '../../components/settings/layout/asPage'
import SchoolSetting from '../../components/settings/SchoolSetting'

const SchoolSettingPage = asPage(
  SchoolSetting,
  { title: 'בחר בית ספר', centerContent: true },
  ({ school, schoolName, setSchool, setSchoolName }, router) => ({
    isEditing: true,
    value: { symbol: Number(school), name: schoolName },
    save: ({ symbol, name }) => {
      if (symbol && name) {
        setSchool(symbol.toString())
        setSchoolName(name)
      }
      router.push('/settings/class')
    },
  })
)

export default SchoolSettingPage
