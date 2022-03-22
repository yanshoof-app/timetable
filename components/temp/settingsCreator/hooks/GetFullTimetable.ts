import axios from 'axios'
import { useCallback } from 'react'
import { useHTTP } from '../../../../hooks/useHTTP'
import { LessonOrMultiple } from '../../../../interfaces/lesson'

const FULL_TIMETABLE_URL = '/api/timetable/initial'

export default async function getFullTimetable(
  school: string,
  classId: string
) {
  const req = `${FULL_TIMETABLE_URL}?school=${school}&classId=${classId}`
  let data = await axios(req)

  return data.data
}
