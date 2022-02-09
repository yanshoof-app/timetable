import { NextApiRequest, NextApiResponse } from 'next';
import { IChangesResponse, IClassesResponse, IScheduleResponse } from '../../../interfaces';
import { ClassLookup, fetchDataSource, TeacherTimetable, Timetable } from '../../../utils';
import {
  AMI_ASSAF_SYMBOL,
  SETTINGS,
  YUD_7_ID,
} from '../../../utils/sample-constants';
import { TeacherList } from '../../../utils/teacherList/TeacherList';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    let query = _req.query;
    console.log((_req.cookies.timetable));
  try {
    res.status(200).json({ ...[query] });
  }
  catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default handler;