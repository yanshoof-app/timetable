import { useMemo, useState } from 'react'
import { useStorage } from '../../contexts/Storage'
import { useClasses } from '../../hooks/useClasses'
import { ClassLookup } from '../../utils'
import Button from '../forms/Button'
import DropdownPick from '../forms/DropdownPick'
import { Edit } from '../icons'

export default function ClassPick() {
  const { classId, setClassId } = useStorage()
  const { school, setSchool } = useStorage()
  const { classes, grades, isLoading } = useClasses(school)
  const [grade, setGrade] = useState(0)

  return typeof classes[0] != 'undefined' ? (
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
          options={grades.map((grade) =>
            ClassLookup.getFormattedGradeName(grade)
          )}
          onChange={(selectedGrade) => {
            setGrade(selectedGrade)
          }}
        ></DropdownPick>
        <DropdownPick
          options={classes[grade]
            .filter((grade) => grade != -1)
            .map((classId, index) => (index + 1).toString())}
          onChange={(selectedClassId) => {
            setClassId(classes[grade].toString())
          }}
        ></DropdownPick>
        <Button className="m-0 w-20">הבא</Button>
      </div>
    </div>
  ) : (
    <div></div>
  )
}
