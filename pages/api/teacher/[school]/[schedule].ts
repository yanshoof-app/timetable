import { NextApiRequest, NextApiResponse } from 'next'
import {
  IChangesResponse,
  IClassesResponse,
  IScheduleResponse,
} from '../../../../interfaces'
import {
  ClassLookup,
  fetchDataSource,
  TeacherTimetable,
} from '../../../../utils'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const query = _req.query
  const schoolSymbol = query.school.toString()
  const commonTeacher = query.schedule
  try {
    const classResponse = await fetchDataSource<IClassesResponse>(
      'classes',
      schoolSymbol,
      0
    )
    const classLookup = new ClassLookup(classResponse.Classes)
    let teacherTimetable = new TeacherTimetable(commonTeacher.toString())
    let scheduleResponse: IScheduleResponse
    for (let grade of classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue
        scheduleResponse = await fetchDataSource<IScheduleResponse>(
          'schedule',
          schoolSymbol,
          classId
        )
        teacherTimetable.fromIscool(scheduleResponse.Schedule)
      }
    }
    let changesResponse: IChangesResponse
    for (let grade of classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue
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
