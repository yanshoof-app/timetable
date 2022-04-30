import { useMemo, useState } from 'react'
import { useStorage } from '../contexts/Storage'
import { TeacherList } from '../utils/teacherList/TeacherList'

export function useTeacherList() {
  const { lessons } = useStorage()
  const initialTeachers = useMemo(
    () => new Set(TeacherList.fromSchedule(lessons)),
    [lessons]
  )
  const [teacherSet, setTeacherSet] = useState(initialTeachers)

  return {
    teachers: [...teacherSet],
    showMore: () => {},
    isLoading: true,
    classesSearched: 8,
    totalClasses: 24,
  }
}
