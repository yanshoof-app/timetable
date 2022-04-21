import {
  fetchDataSource,
  IChangesResponse,
  IScheduleResponse,
} from '@yanshoof/iscool'
import { NextApiRequest, NextApiResponse } from 'next'
import { Timetable } from '../../../utils'
import { QueryParamsSettings } from '../../../utils'
import { InputError } from '../../../utils/errors'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = _req.query
    const settings = new QueryParamsSettings(query)
    const schoolSymbol = query.school.toString()
    const classId = query.classId.toString()
    const timetable = new Timetable(settings)

    const { Schedule } = await fetchDataSource<IScheduleResponse>(
      'schedule',
      schoolSymbol,
      classId
    )
    timetable.fromIscool(Schedule)

    const { Changes } = await fetchDataSource<IChangesResponse>(
      'changes',
      schoolSymbol,
      classId
    )
    timetable.applyChanges(Changes)
    res
      .status(200)
      .json(
        JSON.stringify(
          { lessons: timetable.lessons, problems: timetable.problems },
          null,
          2
        )
      )
  } catch (err: any) {
    res.status(500).json({
      statusCode: err.name == InputError.errorName ? 422 : 500,
      message: err.message,
    })
  }
}

export default handler
