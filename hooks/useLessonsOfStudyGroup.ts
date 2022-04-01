import { useMemo } from 'react'
import { useStorage } from '../contexts/Storage'
import { HourOfDay } from '../interfaces'

export default function useLessonsOfStudyGroup(
  studyGroupId: number
): HourOfDay[][] {
  const { studyGroupMap } = useStorage()
  return useMemo(() => {
    const days: HourOfDay[][] = new Array(7).fill([])
    for (let [key, currentStudyGroupId] of studyGroupMap) {
      if (studyGroupId == currentStudyGroupId) {
        // found study group
        const [day, hour] = key.split(',')
        days[Number(day)].push(Number(hour) as HourOfDay)
      }
    }
    return days
  }, [studyGroupMap, studyGroupId])
}
