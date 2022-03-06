import { useMemo } from 'react'
import { MIN_HOUR, SupportedLesson } from '../components/timetable/Timetable'
import {
  DayOfWeek,
  HourOfDay,
  IStudyGroup,
  LessonOrMultiple,
} from '../interfaces'

export type PickableLesson = {
  day: DayOfWeek
  hour: HourOfDay
}

export function isPickableLesson(
  lesson: IStudyGroup[] | SupportedLesson,
  day: DayOfWeek,
  hour: HourOfDay,
  allEditable: boolean
) {
  if (Array.isArray(lesson)) {
    if (lesson.length > 1) {
      return true
    } else if (hour > 7 || hour < MIN_HOUR) {
      return true
    } else if (day > 4) {
      return true
    } else if (allEditable) {
      return true
    } else {
      return false
    }
  }
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
