import { NextApiRequest, NextApiResponse } from 'next'
import {
  IChangesResponse,
  IScheduleResponse,
  IscoolClassLookup,
  fetchDataSource,
} from '@yanshoof/iscool'
import { TeacherTimetable } from '../../../../utils'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const query = _req.query
  const schoolSymbol = query.school.toString()
  const commonTeacher = query.schedule
  try {
    const classLookup = await IscoolClassLookup.fromSchool(schoolSymbol)
    let teacherTimetable = new TeacherTimetable(commonTeacher.toString())
    let scheduleResponse: IScheduleResponse
    for (let grade of classLookup.classIds) {
      for (let classId of grade) {
        if (classId == IscoolClassLookup.CLASS_NOT_FOUND) continue
        scheduleResponse = await fetchDataSource<IScheduleResponse>(
          'schedule',
          schoolSymbol,
          classId
        )
        teacherTimetable.fromSchedule(scheduleResponse.Schedule)
      }
    }
    let changesResponse: IChangesResponse
    for (let grade of classLookup.classIds) {
      for (let classId of grade) {
        if (classId == IscoolClassLookup.CLASS_NOT_FOUND) continue
        changesResponse = await fetchDataSource<IChangesResponse>(
          'changes',
          schoolSymbol,
          classId
        )
        teacherTimetable.applyChanges(changesResponse.Changes)
      }
    }
    res.status(200).json(JSON.stringify(teacherTimetable.lessons, null, 2))
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
