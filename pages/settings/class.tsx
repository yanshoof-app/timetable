import ClassSetting from '../../components/settings/ClassSetting'
import asPage from '../../components/settings/layout/asPage'

const ClassSettingPage = asPage(
  ClassSetting,
  { title: 'בחר כיתה', centerContent: true },
  ({ classId, setClassId, setSchool }, router) => ({
    value: { grade: 10, classNum: 7, classId }, // TODO: Save grade and classNum
    save: ({ grade, classNum, classId }) => {
      setClassId(classId)
    },
    onSchoolEditClick: () => router.push('/settings/school'),
  })
)

export default ClassSettingPage
