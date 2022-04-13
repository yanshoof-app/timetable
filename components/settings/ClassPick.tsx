import { useMemo, useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import { useClasses } from '../../hooks/useClasses'
import { ClassLookup } from '../../utils'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { BackRTL, Edit } from '../icons'
import Layout from '../Layout'
import LoadingScreen from '../ui/LoadingScreens'
import PageTitle from '../ui/PageTitle'
import { ISettingsPageProps } from './types'

export interface IClassPickProps extends ISettingsPageProps {
  onSchoolEditPress?(): void
}

export default function ClassPick({
  onBackPress,
  onSchoolEditPress,
}: IClassPickProps) {
  const {
    school,
    schoolName,
    classId,
    setSchool,
    setClassId,
    setUserClassName,
  } = useStorage()
  const { classes, grades } = useClasses(school)
  const [grade, setGrade] = useState(0)
  const [tempClassId, setTempClassId] = useState(classId)
  const [tempUserClassName, setTempUserClassName] = useState('')
  const classesIds = useMemo(
    () =>
      typeof classes[0] != 'undefined'
        ? classes[grade]
            .filter((grade) => grade != -1)
            .map((classId, index) => (index + 1).toString())
        : [],
    [classes, grade]
  )
  const gradesArray = useMemo(
    () => grades.map((grade) => ClassLookup.getFormattedGradeName(grade)),
    [grades]
  )

  return (
    <Layout className="px-4 flex flex-col justify-between" title="בחירת כיתה">
      {onBackPress && (
        <PageTitle
          title="בחירת כיתה"
          startIcon={BackRTL}
          onStartIconClick={() => {
            setClassId(tempClassId)
            setUserClassName(tempUserClassName)
            onBackPress()
          }}
        />
      )}
      {classes[0] ? (
        <div className="flex flex-col justify-center items-center gap-5 mb-[40vh]">
          <div className="flex flex-col gap-2 justify-center items-center">
            <div className="flex justify-center items-center gap-1">
              <p className="font-bold text-4xl">{schoolName}</p>
              <button
                onClick={() =>
                  onSchoolEditPress ? onSchoolEditPress() : setSchool()
                }
              >
                <Edit width={24} height={24}></Edit>
              </button>
            </div>
            <p className="font-bold text-2xl">באיזו כיתה אתם לומדים?</p>
          </div>
          <div className="flex gap-4 justify-center">
            <DropdownPick
              options={gradesArray}
              onIndexChange={(selectedGrade) => {
                setGrade(selectedGrade)
              }}
            />
            <DropdownPick
              options={classesIds}
              onIndexChange={(selectedClassId) => {
                setTempClassId(classes[grade][selectedClassId].toString())
                setTempUserClassName(
                  `${gradesArray[grade]}${selectedClassId + 1}`
                )
              }}
            />
            {!onBackPress && (
              <Button
                className="w-20 my-0 mx-0"
                onClick={() => {
                  setClassId(tempClassId)
                  setUserClassName(tempUserClassName)
                }}
              >
                הבא
              </Button>
            )}
          </div>
        </div>
      ) : (
        <LoadingScreen label="כיתות" />
      )}
    </Layout>
  )
}
