import { useMemo } from 'react'
import { ThemeColor } from '../components/theme'
import { IModification, LessonModification } from '../interfaces'

const LESSON_CANCELED = 'ביטול שיעור'
const NEW_TEACHER = 'החלפת מורה'
const NEW_ROOM = 'החלפת חדר'
const NEW_LESSON = 'החלפת שיעור'

const DEFAULT_DATA: IModification = {
  modification: LessonModification.None,
}

/**
 * Gets information about a modification
 * @param modification the modification to check
 * @returns a tuple of the matching color and modification message
 */
export default function useModification({
  modification,
  modData,
}: IModification = DEFAULT_DATA): [ThemeColor, string] {
  return useMemo(() => {
    switch (modification) {
      case LessonModification.Canceled:
        return ['celebration', LESSON_CANCELED]
      case LessonModification.Exam:
        return ['event', modData as string]
      case LessonModification.NewTeacher:
        return ['change', NEW_TEACHER]
      case LessonModification.NewRoom:
        return ['change', NEW_ROOM]
      case LessonModification.NewHour:
        return ['change', NEW_LESSON]
      case LessonModification.Other:
        return ['event', modData as string]
      default:
        return ['gray', undefined]
    }
  }, [modification])
}
