import { useMemo } from 'react'
import { useStorage } from '../contexts/Storage'
import { DayOfWeek, LessonModification } from '../interfaces'

export default function useConfetti(
  modType: LessonModification,
  day: DayOfWeek
) {
  const { lessons } = useStorage()
  return useMemo(
    () =>
      lessons[day].some(
        (lesson) =>
          lesson.changes &&
          lesson.changes.some((change) => change.modification == modType)
      ),
    [lessons, day, modType]
  )
}
