import { useMemo } from 'react'
import { MIN_HOUR, SupportedLesson } from '../components/timetable/Timetable'
import {
  DayOfWeek,
  HourOfDay,
  IStudyGroup,
  LessonOrMultiple,
} from '../interfaces'
import { isPickableHour } from '../utils/timetable/pickableHour'

export type PickableLesson = {
  day: DayOfWeek
  hour: HourOfDay
}

export function isPickableLesson(
  lesson: IStudyGroup[],
  day: DayOfWeek,
  hour: HourOfDay,
  allEditable: boolean
) {
  return (
    (lesson.length > 1 || allEditable || isPickableHour(day, hour)) &&
    lesson.length
  )
}

export function useEditableDays(timetable: LessonOrMultiple[][]): DayOfWeek[] {
  return useMemo(() => {
    const set = new Set<DayOfWeek>()
    timetable.forEach((dailyLessons, day) => {
      if (
        dailyLessons.some((lesson, hour) =>
          isPickableLesson(lesson, day as DayOfWeek, hour as HourOfDay, false)
        )
      )
        set.add(day as DayOfWeek)
    })
    return [...set]
  }, [timetable])
}
