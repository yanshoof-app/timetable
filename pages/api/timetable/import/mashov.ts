import { fetchDataSource, IScheduleResponse } from '@yanshoof/iscool'
import {
  IMashovLesson,
  IMashovStudyGroup,
  MashovFetchDataSource,
  MashovLogin,
} from '@yanshoof/mashov'
import { NextApiRequest, NextApiResponse } from 'next'
import { FullTimeable } from '../../../../utils'
import { InputError } from '../../../../utils/errors'
import { MashovStudyGroupImporter } from '../../../../utils/settings/MashovStudyGroup'

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { schoolSymbol, classId, username, password } = _req.query

    const { Schedule } = await fetchDataSource<IScheduleResponse>(
      'schedule',
      schoolSymbol as string,
      classId as string
    )

    const { authCookie, studentId, xCsrfToken } = await MashovLogin({
      semel: schoolSymbol as string,
      username: username as string,
      password: password as string,
    })
    const auth = { authCookie, studentId, xCsrfToken }

    const timetable = await MashovFetchDataSource<IMashovLesson[]>(
      'timetable',
      auth
    )

    const studyGroups = await MashovFetchDataSource<IMashovStudyGroup[]>(
      'groups',
      auth
    )

    const studyGroupImporter = new MashovStudyGroupImporter(
      timetable,
      studyGroups
    )

    res.status(200).json(studyGroupImporter.fromSchedule(Schedule))
  } catch (err: any) {
    res.status(500).json({
      statusCode: err.name == InputError.errorName ? 422 : 500,
      message: err.message,
    })
  }
}

export default handler
