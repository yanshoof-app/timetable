import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { IClassSetting } from '../components/settings/ClassSetting'
import { useClassLookup } from '../contexts/ClassLookup'
import { useStorage } from '../contexts/Storage'
import { ClassLookup } from '../utils'

export interface IClassPickHookParams {
  grade?: number
  classNum?: number
  onChange: Dispatch<SetStateAction<IClassSetting>>
}

export interface IClassPickHook {
  gradeOptions: string[]
  gradeIndex: number
  classNumOptions: string[]
  onGradeIndexChange: (idx: number) => unknown
  onClassNumIndexChange: (idx: number) => unknown
  isValid: boolean
}

export default function useClassPick({
  grade,
  classNum,
  onChange,
}: IClassPickHookParams) {
  const { grades, classIds } = useStorage()
  const { getId } = useClassLookup()
  const gradeOptions = useMemo(
    () => grades.map((grade) => ClassLookup.getFormattedGradeName(grade)),
    [grades]
  )
  const gradeIndex = useMemo(
    () => (grades[0] && grade ? grade - grades[0] : 0),
    [grade, grades]
  )
  const classNumOptions = useMemo(
    () =>
      classIds && classIds[gradeIndex]
        ? classIds[gradeIndex]
            .filter((grade) => grade != -1)
            .map((classId, index) => (index + 1).toString())
        : [],
    [classIds, gradeIndex]
  )
  const onGradeIndexChange = useCallback(
    (idx: number) => {
      const newGrade = grades[idx]
      onChange((prev) => ({
        ...prev,
        grade: newGrade,
        classId: getId(newGrade, prev.classNum).toString(),
      }))
    },
    [getId, grades, onChange]
  )
  const onClassNumIndexChange = useCallback(
    (idx: number) => {
      const newClassNum = idx + 1
      onChange((prev) => ({
        ...prev,
        classNum: newClassNum,
        classId: getId(prev.grade, newClassNum).toString(),
      }))
    },
    [onChange, getId]
  )

  const isValid = useMemo(
    () => getId(grade, classNum) != ClassLookup.CLASS_NOT_FOUND,
    [classNum, getId, grade]
  )

  // set value as default picks if not defined
  useEffect(() => {
    if ((!classNum || !grade) && classIds[0] && grades[0])
      onChange({
        grade: grades[0],
        classNum: 1,
        classId: classIds[0][0].toString(),
      })
  }, [classIds, classNum, grade, grades, onChange])

  return {
    gradeOptions,
    gradeIndex,
    classNumOptions,
    onGradeIndexChange,
    onClassNumIndexChange,
    isValid,
  }
}
