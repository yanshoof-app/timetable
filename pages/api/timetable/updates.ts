import { NextApiRequest, NextApiResponse } from 'next'
import { IChangesResponse } from '../../../interfaces'
import { fetchDataSource, Timetable } from '../../../utils'
import { QueryParamsSettings } from '../../../utils'
import { InputError } from '../../../interfaces/errors'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = _req.query
    const settings = new QueryParamsSettings(query)
    const schoolSymbol = query.school as string
    const classId = query.classId as string
    const lastUserUpdate = query.lastUserUpdate
      ? new Date(query.lastUserUpdate as string)
      : new Date(0)

    const { Changes } = await fetchDataSource<IChangesResponse>(
      'changes',
      schoolSymbol,
      classId
    )
    const newChanges = Timetable.updateableTimetable(lastUserUpdate, Changes)

    // if new week, create new timetable and apply existing changes
    // otherwise, return new changes

    // res.status(200).json()
  } catch (err: any) {
    res.status(500).json({
      statusCode: err.name == InputError.errorName ? 422 : 500,
      message: err.message,
    })
  }
}

export default handler
