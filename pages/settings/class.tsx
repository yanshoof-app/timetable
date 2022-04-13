import ClassSetting from '../../components/settings/ClassSetting'
import asPage from '../../components/settings/layout/asPage'

const ClassSettingPage = asPage(
  ClassSetting,
  { title: 'בחר כיתה', centerContent: true },
  (
    { classId, setClassId, grade, setGrade, classNum, setClassNum },
    router
  ) => ({
    isEditing: true,
    value: { grade, classNum, classId },
    save: ({ grade, classNum, classId }) => {
      console.log(grade, classNum, classId)
      setClassId(classId)
      setGrade(grade)
      setClassNum(classNum)
    },
    onSchoolEditClick: () => router.push('/settings/school'),
    navigateBack: () => router.push('/settings'),
  })
)

export default ClassSettingPage
