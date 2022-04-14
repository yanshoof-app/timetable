import asPage from '../../components/settings/layout/asPage'
import SchoolSetting from '../../components/settings/SchoolSetting'

const SchoolSettingPage = asPage(
  SchoolSetting,
  { title: 'בחר בית ספר', centerContent: true },
  (
    {
      school,
      schoolName,
      setSchool,
      setSchoolName,
      setClassId,
      resetTimetableSettings,
    },
    router
  ) => ({
    isEditing: true,
    value: { symbol: Number(school), name: schoolName },
    save: ({ symbol, name }) => {
      if (symbol && name && school !== symbol.toString()) {
        setSchool(symbol.toString())
        setSchoolName(name)
        setClassId()
        resetTimetableSettings()
      }
    },
    navigateBack: () => router.push('/settings/class'),
  })
)

export default SchoolSettingPage
