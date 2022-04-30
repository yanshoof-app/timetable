import { useMemo, useState } from 'react'
import { useStorage } from '../contexts/Storage'

export function useTeacherList() {
  const { lessons } = useStorage()
  const initialTeachers = useMemo(() => {
    const teacherSet = new Set<string>()
    for (let day of lessons) {
      for (let lesson of day) {
        if (typeof lesson.teacher !== 'undefined')
          teacherSet.add(lesson.teacher)
      }
    }
    return teacherSet
  }, [lessons])
  const [teacherSet, setTeacherSet] = useState(initialTeachers)

  return {
    teachers: [...teacherSet],
    showMore: () => {},
    isLoading: true,
    classesSearched: 8,
    totalClasses: 24,
  }
}
