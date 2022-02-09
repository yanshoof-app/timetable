import { NextApiRequest, NextApiResponse } from 'next';
import { IChangesResponse, IClassesResponse, IScheduleResponse } from '../../../../interfaces';
import { ClassLookup, fetchDataSource, TeacherTimetable, Timetable } from '../../../../utils';
import {
  AMI_ASSAF_SYMBOL,
  SETTINGS,
  YUD_7_ID,
} from '../../../../utils/sample-constants';
import { TeacherList } from '../../../../utils/teacherList/TeacherList';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    let school = _req.query.school.toString();
    let commonTeacher = _req.query.schedule;
  try {
    const classResponse = await fetchDataSource<IClassesResponse>(
        'classes',
        school,
        0
      );
    const classLookup = new ClassLookup(classResponse.Classes);  
    let teacherTimetable = new TeacherTimetable(commonTeacher.toString());
    let scheduleResponse: IScheduleResponse;
    for (let grade of classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue;
        scheduleResponse = await fetchDataSource<IScheduleResponse>(
          'schedule',
          school,
          classId
        );
        teacherTimetable.fromIscool(scheduleResponse.Schedule);
      }
    }
    let changesResponse: IChangesResponse;
    for (let grade of classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue;
        changesResponse = await fetchDataSource<IChangesResponse>(
          'changes',
          school,
          classId
        );
        teacherTimetable.applyChanges(changesResponse.Changes);
      }
    }
    res.status(200).json(JSON.stringify(teacherTimetable.lessons, null, 2));
  }
  catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default handler;