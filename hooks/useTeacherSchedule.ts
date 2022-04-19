import { ILesson, ITeacherLesson } from '../interfaces'
import { initMatrix } from '../utils'
const TEACHER_URL = '/api/teacher'

export interface ITeacherScheduleStatus {
  lessonsFound: number
  classesSearched: number
  totalClasses: number
  isLoading: boolean
}

export interface ITeacherSchedule extends ITeacherScheduleStatus {
  lessons: ITeacherLesson[][]
}

export default function useTeacherSchedule(
  teacherName: string
): ITeacherSchedule {
  /*
  const { data } = useHTTP<any, ITeacherLesson[][]>({
    path: `${TEACHER_URL}/${school}/${teacherName}`,
    initialValue: [],
  })
  const teacherSchedule = data

  return { teacherSchedule }
  */
  return {
    lessons: initMatrix<ILesson>(7, 12, {}),
    isLoading: true,
    lessonsFound: 32,
    classesSearched: 8,
    totalClasses: 24,
  }
}
