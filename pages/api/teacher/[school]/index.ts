import { NextApiRequest, NextApiResponse } from 'next';
import { IChangesResponse, IClassesResponse, IScheduleResponse } from '../../../../interfaces';
import { ClassLookup, fetchDataSource, Timetable } from '../../../../utils';
import {
} from '../../../../utils/sample-constants';
import { TeacherList } from '../../../../utils/teacherList/TeacherList';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    let school = _req.query.school.toString();
    const classResponse = await fetchDataSource<IClassesResponse>(
        'classes',
        school,
        0
      );
    const classLookup = new ClassLookup(classResponse.Classes);
    let teachers = new TeacherList();
    let scheduleResponse: IScheduleResponse;
    for (let grade of classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue;
        scheduleResponse = await fetchDataSource<IScheduleResponse>(
          'schedule',
          school,
          classId
        );
        teachers.fromIscool(scheduleResponse.Schedule);
      }
    }

    res.status(200).json({ ...teachers.teachers });
  }
  catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default handler;