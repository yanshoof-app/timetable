import { NextApiRequest, NextApiResponse } from 'next'
import {
  IChange,
  IChangesResponse,
  IScheduleResponse,
} from '../../../interfaces'
import { fetchDataSource, Timetable } from '../../../utils'
import { QueryParamsSettings } from '../../../utils'
import { InputError } from '../../../interfaces/errors'
import { isNewWeek } from '../../../utils/data/updates'
import withFixedSettings from '../../../utils/settings/withFixedSettings'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = _req.query
    const settings = new QueryParamsSettings(query)
    const schoolSymbol = query.school as string
    const classId = query.classId as string
    const lastUserUpdate = query.lastUserUpdate
      ? new Date(query.lastUserUpdate as string)
      : new Date(0)

    if (!schoolSymbol || !classId)
      throw new InputError(
        'School and classId must be provided via query params'
      )

    const { Changes } = await fetchDataSource<IChangesResponse>(
      'changes',
      schoolSymbol,
      classId
    )

    // if new week or no study groups, create a new timetable and apply changes
    if (isNewWeek(lastUserUpdate) || query.studyGroups === '') {
      const timetable = new Timetable(settings)
      const { Schedule } = await fetchDataSource<IScheduleResponse>(
        'schedule',
        schoolSymbol,
        classId
      )
      timetable.fromIscool(Schedule)
      timetable.applyChanges(Changes)
      res.status(200).json(
        withFixedSettings(settings, {
          overrideTimetable: timetable.lessons,
          problems: timetable.problems,
        })
      )
    }

    // otherwise, return new changes
    else {
      const { newChanges } = Timetable.newChanges(lastUserUpdate, Changes)
      res.status(200).json(
        withFixedSettings(settings, {
          newChanges: newChanges,
        })
      )
    }
  } catch (err: any) {
    res.status(500).json({
      statusCode: err.name == InputError.errorName ? 422 : 500,
      message: err.message,
    })
  }
}

export default handler
