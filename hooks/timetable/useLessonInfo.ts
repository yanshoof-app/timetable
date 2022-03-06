import { useMemo } from 'react'
import { IModification, LessonModification } from '../../interfaces'

export type LessonInfoHook = {
  newHour?: string | boolean
  newTeacher?: string | boolean
  newRoom?: string | boolean
}

export default function useLessonInfo(
  modifications: IModification[]
): LessonInfoHook {
  return useMemo(() => {
    let info: LessonInfoHook = {}
    for (let { modification, modData } of modifications) {
      switch (modification) {
        case LessonModification.Canceled:
          info = { newRoom: true, newTeacher: true, newHour: true }
          break
        case LessonModification.NewTeacher:
          info['newTeacher'] = modData.toString()
          break
        case LessonModification.NewRoom:
          info['newRoom'] = modData.toString()
          break
        case LessonModification.NewHour:
          info['newHour'] = modData.toString()
          break
        case LessonModification.Exam:
          info['newHour'] = true
          break
        case LessonModification.Other:
          info['newHour'] = true
          break
      }
    }
    return info
  }, [modifications])
}
