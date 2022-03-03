import { LessonOrMultiple } from '../../interfaces'

export interface IFullTimetableContext {
  isLoading: boolean
  timetable?: LessonOrMultiple[][]
  doFetch(): unknown
}

export interface IFullTimetableReqType {
  school: string
  classId: string
}
