import { useMemo } from 'react'
import { useStorage } from '../contexts/Storage'
import { DayOfWeek, LessonModification } from '../interfaces'

export default function useConfetti(
  modType: LessonModification,
  day: DayOfWeek
) {
  const { lessons } = useStorage()
  return useMemo(() => {
    for (let lesson of lessons[day]) {
      if (lesson.changes.some((change) => change.modData == modType))
        return true
    }
    return false
  }, [lessons])
}
