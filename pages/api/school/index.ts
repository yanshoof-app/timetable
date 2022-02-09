import { NextApiRequest, NextApiResponse } from 'next';
import { IChangesResponse, IClassesResponse, IScheduleResponse } from '../../../interfaces';
import { ClassLookup, fetchDataSource, SchoolLookup, TeacherTimetable, Timetable } from '../../../utils';
import {
  AMI_ASSAF_SYMBOL,
  SETTINGS,
  YUD_7_ID,
} from '../../../utils/sample-constants';
import { TeacherList } from '../../../utils/teacherList/TeacherList';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  let search = _req.query.search;
  try {
    const school = await SchoolLookup.buildFromQuery(search.toString());
    const SchoolResult = school.results;
    console.log(school.results);
    res.status(200).json( SchoolResult );
  }
  catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default handler;