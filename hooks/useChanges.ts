import { useMemo } from 'react'
import {
  DayOfWeek,
  HourOfDay,
  ILesson,
  IModification,
  LessonModification,
} from '../interfaces'
import { initArray } from '../utils/data/arrays'

export interface ChangeInfo {
  day: DayOfWeek
  hour: HourOfDay
  studyGroup?: string
  typeOfChange: LessonModification
  change?: string
}

const infoToStudyGroup = (subject: string, teacher: string) => {
  return `${teacher && `${teacher} עם`} ${subject}`
}

export const modToChange = (
  day: DayOfWeek,
  hour: HourOfDay,
  modification: IModification,
  lesson: ILesson
): ChangeInfo => {
  const studyGroup = infoToStudyGroup(lesson.subject, lesson.teacher)

  switch (modification.modification) {
    case LessonModification.NewHour:
      return {
        day: day,
        hour: hour,
        studyGroup: studyGroup,
        typeOfChange: modification.modification,
        change: `${lesson.subject} ל${modification.modData}`,
      }

    case LessonModification.NewRoom:
      return {
        day: day,
        hour: hour,
        studyGroup: studyGroup,
        typeOfChange: modification.modification,
        change: `${lesson.class}מ ${modification.modData}ל`,
      }

    case LessonModification.NewTeacher:
      return {
        day: day,
        hour: hour,
        studyGroup: studyGroup,
        typeOfChange: modification.modification,
        change: `${modification.modData} מחליף את ${lesson.teacher}`,
      }

    case LessonModification.Exam:
      return {
        day: day,
        hour: hour,
        studyGroup: studyGroup,
        typeOfChange: modification.modification,
        change: `${modification.modData}ב`,
      }

    case LessonModification.Canceled:
      return {
        day: day,
        hour: hour,
        studyGroup: studyGroup,
        typeOfChange: modification.modification,
      }
  }
}

export const eventToChange = (
  day: DayOfWeek,
  hour: HourOfDay,
  event: string
): ChangeInfo => {
  return {
    day: day,
    hour: hour,
    typeOfChange: LessonModification.Other,
    change: event,
  }
}

/**
 * Returns array of all changes from given lessons matrix
 */
export default function useChanges(lessons: ILesson[][]) {
  return useMemo(() => {
    const changes = initArray<ChangeInfo>(7)
    for (let day in lessons) {
      for (let hour in lessons[day]) {
        const lesson = lessons[day][hour]
        const dayOfWeek = Number(day) as DayOfWeek
        const hourOfDay = Number(hour) as HourOfDay

        if (lesson.changes) {
          for (let change of lesson.changes) {
            changes[dayOfWeek].push(
              modToChange(dayOfWeek, hourOfDay, change, lesson)
            )
          }
        }

        if (lesson.otherChanges) {
          for (let change of lesson.otherChanges) {
            changes[dayOfWeek].push(
              modToChange(dayOfWeek, hourOfDay, change, lesson)
            )
          }
        }

        if (lesson.events) {
          for (let event of lesson.events) {
            changes[dayOfWeek].push(eventToChange(dayOfWeek, hourOfDay, event))
          }
        }
      }
    }

    return changes
  }, [lessons])
}
