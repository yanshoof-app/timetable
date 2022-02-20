import { useMemo } from 'react'
import { IModification, LessonModification } from '../interfaces'

export type LessonInfoHook = {
  newHour?: string
  newTeacher?: string
  newRoom?: string
}

export default function useLessonInfo(
  modifications: IModification[]
): LessonInfoHook {
  return useMemo(() => {
    let info: LessonInfoHook = {}
    for (let { modification, modData } of modifications) {
      switch (modification) {
        case LessonModification.Canceled:
          info = { newRoom: '', newTeacher: '', newHour: '' }
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
      }
    }
    return info
  }, [modifications])
}
