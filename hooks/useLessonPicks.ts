import { MIN_HOUR, SupportedLesson } from '../components/timetable/Timetable'
import {
  DayOfWeek,
  HourOfDay,
  IStudyGroup,
  LessonOrMultiple,
} from '../interfaces'
import { FullTimeable } from '../utils'

type PickableLesson = {
  day: DayOfWeek
  hour: HourOfDay
}

export function IsPickableLesson(
  lesson: IStudyGroup[] | SupportedLesson,
  hour: HourOfDay,
  allEditable: boolean
) {
  if (Array.isArray(lesson)) {
    if (lesson.length > 1) {
      return true
    } else if (hour > 7 || hour < MIN_HOUR) {
      return true
    } else if (allEditable) {
      return true
    } else {
      return false
    }
  }
}

export type LessonPickHook = PickableLesson[]

export function useLessonPicks(
  timetable: LessonOrMultiple[][]
): LessonPickHook {
  let pickableLessons = []
  for (let day in timetable) {
    for (let hour in timetable[day]) {
      if (
        IsPickableLesson(timetable[day][hour], Number(hour) as HourOfDay, false)
      ) {
        pickableLessons.push({
          day: Number(day) as DayOfWeek,
          hour: Number(hour) as HourOfDay,
        })
      }
    }
  }
  return pickableLessons
}
