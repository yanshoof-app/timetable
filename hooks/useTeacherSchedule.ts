import { ITeacherLesson } from '../interfaces'
import { useHTTP } from './useHTTP'
const TEACHER_URL = '/api/teacher'

export default function useTeacherSchedule(school, teacherName: string) {
  const { data } = useHTTP<any, ITeacherLesson[][]>({
    path: `${TEACHER_URL}/${school}/${teacherName}`,
    initialValue: [],
  })
  const teacherSchedule = data

  return { teacherSchedule }
}
