import ClassSetting from '../../components/settings/ClassSetting'
import asPage from '../../components/settings/layout/asPage'

const ClassSettingPage = asPage(
  ClassSetting,
  { title: 'בחר כיתה', centerContent: true },
  (
    {
      classId,
      setClassId,
      grade,
      setGrade,
      classNum,
      setClassNum,
      resetTimetableSettings,
    },
    router
  ) => ({
    isEditing: true,
    value: { grade, classNum, classId },
    save: ({ grade: newGrade, classNum: newClassNum, classId: newClassId }) => {
      if (newClassId !== classId) {
        setClassId(newClassId)
        setGrade(newGrade)
        setClassNum(newClassNum)
        resetTimetableSettings()
      }
    },
    onSchoolEditClick: () => router.push('/settings/school'),
    navigateBack: () => router.push('/settings'),
  })
)

export default ClassSettingPage
