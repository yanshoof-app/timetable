import { useMemo } from 'react'
import {
  DayOfWeek,
  HourOfDay,
  ILesson,
  IModification,
  LessonModification,
} from '../interfaces'
import { initArray, initMatrix } from '../utils/data/arrays'

export interface ChangeInfo {
  typeOfChange: LessonModification
  data?: string
}

export interface HourlyChanges {
  hour: HourOfDay
  studyGroup: string
  changes: ChangeInfo[]
  otherChanges: ChangeInfo[]
  events: ChangeInfo[]
}

const infoToStudyGroup = (lesson: ILesson) => {
  const { subject, teacher } = lesson
  return teacher ? `${subject} עם ${teacher}` : subject
}

export const modToChange = (
  modification: IModification,
  lesson: ILesson
): ChangeInfo => {
  switch (modification.modification) {
    case LessonModification.NewHour:
      return {
        typeOfChange: modification.modification,
        data: `${lesson.subject} ל${modification.modData}`,
      }

    case LessonModification.NewRoom:
      return {
        typeOfChange: modification.modification,
        data: `${lesson.class}מ ${modification.modData}ל`,
      }

    case LessonModification.NewTeacher:
      return {
        typeOfChange: modification.modification,
        data: `${modification.modData} מחליף את ${lesson.teacher}`,
      }

    case LessonModification.Exam:
      return {
        typeOfChange: modification.modification,
        data: `${modification.modData}ב`,
      }

    case LessonModification.Canceled:
      return {
        typeOfChange: modification.modification,
      }
    default:
      return {
        typeOfChange: modification.modification,
        data: modification.modData as string,
      }
  }
}

export const eventToChange = (event: string): ChangeInfo => {
  return {
    typeOfChange: LessonModification.Other,
    data: event,
  }
}

/**
 * Returns array of all changes from given lessons matrix
 */
export default function useChanges(lessons: ILesson[][]) {
  return useMemo(() => {
    const changes = initArray<HourlyChanges>(7)
    for (let day in lessons) {
      for (let hour in lessons[day]) {
        const lesson = lessons[day][hour]
        const dayOfWeek = Number(day) as DayOfWeek
        const hourOfDay = Number(hour) as HourOfDay

        if (lesson.changes || lesson.otherChanges || lesson.events)
          changes[dayOfWeek][hourOfDay] = {
            hour: hourOfDay,
            studyGroup: infoToStudyGroup(lesson),
            changes: [],
            otherChanges: [],
            events: [],
          }

        if (lesson.changes) {
          for (let change of lesson.changes) {
            changes[dayOfWeek][hour].changes.push(modToChange(change, lesson))
          }
        }

        if (lesson.otherChanges) {
          for (let change of lesson.otherChanges) {
            changes[dayOfWeek][hour].otherChanges.push(
              modToChange(change, lesson)
            )
          }
        }

        if (lesson.events) {
          for (let event of lesson.events) {
            changes[dayOfWeek][hour].events.push(eventToChange(event))
          }
        }
      }
    }

    return changes
  }, [lessons])
}
