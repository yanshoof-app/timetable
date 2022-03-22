import { useMemo, useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import { useClasses } from '../../hooks/useClasses'
import { ClassLookup } from '../../utils'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { Edit } from '../icons'

export default function ClassPick() {
  const { school, setSchool, classId, setClassId } = useStorage()
  const { classes, grades, isLoading } = useClasses(school)
  const [grade, setGrade] = useState(0)
  const [tempClassId, setTempClassId] = useState(classId)
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

  return classes[0] ? (
    <div className="flex flex-col justify-center h-screen items-center gap-5">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex justify-center items-center gap-1">
          <p className="font-bold text-4xl">עמי אסף בית ברל</p>
          <button onClick={() => setSchool('')}>
            <Edit width={24} height={24}></Edit>
          </button>
        </div>
        <p className="font-bold text-2xl">באיזו כיתה אתם לומדים?</p>
      </div>
      <div className="flex gap-4 justify-center">
        <DropdownPick
          options={gradesArray}
          onChange={(selectedGrade) => {
            setGrade(selectedGrade)
          }}
        ></DropdownPick>
        <DropdownPick
          options={classesIds}
          onChange={(selectedClassId) => {
            setTempClassId(classes[grade][selectedClassId].toString())
          }}
        ></DropdownPick>
        <Button
          className="w-20 mt-0 mb-0"
          onClick={() => setClassId(tempClassId)}
        >
          הבא
        </Button>
      </div>
    </div>
  ) : (
    <div></div>
  )
}
