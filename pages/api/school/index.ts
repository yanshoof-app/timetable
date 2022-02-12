import { NextApiRequest, NextApiResponse } from 'next';
import { IChangesResponse, IClassesResponse, IScheduleResponse } from '../../../interfaces';
import { ClassLookup, fetchDataSource, SchoolLookup, TeacherTimetable, Timetable } from '../../../utils';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  let search = _req.query.search;
  try {
    const school = await SchoolLookup.buildFromQuery(search.toString());
    const SchoolResults = school.results;
    res.status(200).json( SchoolResults );
  }
  catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default handler;