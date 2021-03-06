import ClassSetting from './ClassSetting'
import SchoolSetting from './SchoolSetting'
import UpdateTimeSetting from './UpdateTimeSetting'
import asPage from './layout/asPage'

const INIT_PAGE_PROPS = {
  hidePageTitle: true,
  centerContent: true,
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

export const ClassInit = asPage(
  ClassSetting,
  INIT_PAGE_PROPS,
  ({
    classId,
    setClassId,
    grade,
    setGrade,
    classNum,
    setClassNum,
    setSchool,
  }) => ({
    value: { grade, classNum, classId },
    save: ({ grade, classNum, classId }) => {
      setClassId(classId)
      setGrade(grade)
      setClassNum(classNum)
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
