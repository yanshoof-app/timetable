import { useMemo } from 'react'
import { DayOfWeek, HourOfDay, ILesson, IModification } from '../interfaces'

const modToChange = (
  day: DayOfWeek,
  hour: HourOfDay,
  modification: IModification
) => {}

const eventToChange = (day: DayOfWeek, hour: HourOfDay, event: string) => {
  return
}

export default function useChanges(lessons: ILesson[][]) {
  return useMemo(() => {
    const changes = []
    for (let day of lessons) {
      for (let lesson of day) {
        if (lesson.changes) {
          changes.push(...lesson.changes)
        }

        if (lesson.events) {
          changes.push(...lesson.events)
        }
      }
    }

    return changes
  }, [lessons])
}
