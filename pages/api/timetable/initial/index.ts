import { NextApiRequest, NextApiResponse } from 'next'
import { IScheduleResponse } from '../../../../interfaces'
import { fetchDataSource, FullTimeable } from '../../../../utils'
import { InputError } from '../../../../interfaces/errors'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = _req.query
    const schoolSymbol = query.school.toString()
    const classId = query.classId.toString()
    const timetable = new FullTimeable()

    const { Schedule } = await fetchDataSource<IScheduleResponse>(
      'schedule',
      schoolSymbol,
      classId
    )
    timetable.fromIscool(Schedule)
    res.status(200).json(JSON.stringify(timetable.lessons, null, 2))
  } catch (err: any) {
    res.status(500).json({
      statusCode: err.name == InputError.errorName ? 422 : 500,
      message: err.message,
    })
  }
}

export default handler
