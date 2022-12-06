import { NextApiRequest, NextApiResponse } from 'next'
import { ServerTimetable } from '../../../utils'
import { QueryParamsSettings } from '../../../utils'
import { InputError } from '../../../utils/errors'
import withFixedSettings from '../../../utils/settings/withFixedSettings'
import {
  fetchDataSource,
  IChangesResponse,
  IScheduleResponse,
} from '@yanshoof/iscool'
import { startOfWeek } from '../../../utils/data/updates'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = _req.query
    const schoolSymbol = query.school as string
    const classId = query.classId as string
    const lastUserUpdate = query.lastUserUpdate
      ? new Date(query.lastUserUpdate as string)
      : new Date(0)

    if (!schoolSymbol || !classId)
      throw new InputError(
        'School and classId must be provided via query params'
      )

    const settings = new QueryParamsSettings(query)
    const timetable = new ServerTimetable(settings)

    const { Changes } = await fetchDataSource<IChangesResponse>(
      'changes',
      schoolSymbol,
      classId
    )

    // if new week or no study groups, create a new timetable and apply changes
    if (
      lastUserUpdate.getTime() < startOfWeek().getTime() ||
      query.studyGroups === ''
    ) {
      const { Schedule } = await fetchDataSource<IScheduleResponse>(
        'schedule',
        schoolSymbol,
        classId
      )
      timetable.fromSchedule(Schedule)
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
      const { newChanges, newEvents, newOthersChanges } =
        timetable.selectNewChanges(lastUserUpdate, Changes)
      res.status(200).json(
        withFixedSettings(settings, {
          newChanges,
          newEvents,
          newOthersChanges,
        })
      )
    }
  } catch (err: any) {
    const statusCode = err.name == InputError.errorName ? 422 : 500
    res.status(statusCode).json({
      statusCode,
      message: err.message,
    })
  }
}

export default handler
