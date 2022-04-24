import { useMemo } from 'react'
import {
  FROM,
  IN,
  REPLACES,
  TO,
  WITH,
} from '../components/timetable/ChangeList/Change'
import { useStorage } from '../contexts/Storage'
import {
  DayOfWeek,
  HourOfDay,
  ILesson,
  IModification,
  LessonModification,
} from '../interfaces'
import { initArray } from '../utils/data/arrays'

export interface IChangeInfo {
  typeOfChange: LessonModification
  data?: string
  studyGroup?: string
}

export interface IHourlyChanges {
  hour: HourOfDay
  studyGroup: string
  changes: IChangeInfo[]
  otherChanges: IChangeInfo[]
  events: IChangeInfo[]
}

const infoToStudyGroup = (lesson: Partial<ILesson>) => {
  const { subject, teacher } = lesson
  return teacher ? `${subject} ${WITH} ${teacher}` : subject
}

export const modToChange = (
  modification: IModification,
  lesson: ILesson
): IChangeInfo => {
  switch (modification.modification) {
    case LessonModification.NewHour:
      return {
        typeOfChange: modification.modification,
        data: `${lesson.subject} ${TO}${modification.modData}`,
      }

    case LessonModification.NewRoom:
      return {
        typeOfChange: modification.modification,
        data: `${lesson.class}${FROM} ${modification.modData}${TO}`,
      }

    case LessonModification.NewTeacher:
      return {
        typeOfChange: modification.modification,
        data: `${modification.modData} ${REPLACES} ${lesson.teacher}`,
      }

    case LessonModification.Exam:
      return {
        typeOfChange: modification.modification,
        data: `${modification.modData}${IN}`,
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

export const eventToChange = (event: string): IChangeInfo => {
  return {
    typeOfChange: LessonModification.Other,
    data: event,
  }
}

/**
 *
 * @returns an array of days with arrays of changes from user's schedule (IHourlyChanges), and the number of changes found
 */
export default function useChanges(): {
  changes: IHourlyChanges[][]
  numOfChanges: number
} {
  const { lessons } = useStorage()
  return useMemo(() => {
    const changes = initArray<IHourlyChanges>(7)
    let numOfChanges = 0

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
            numOfChanges++
          }
        }

        if (lesson.otherChanges) {
          for (let change of lesson.otherChanges) {
            const changeData = modToChange(change, lesson)
            changes[dayOfWeek][hour].otherChanges.push({
              ...changeData,
              studyGroup: infoToStudyGroup({
                subject: change.subject,
                teacher: change.teacher,
              }),
            })
            numOfChanges++
          }
        }

        if (lesson.events) {
          for (let event of lesson.events) {
            changes[dayOfWeek][hour].events.push(eventToChange(event))
            numOfChanges++
          }
        }
      }
    }

    return { changes, numOfChanges }
  }, [lessons])
}
