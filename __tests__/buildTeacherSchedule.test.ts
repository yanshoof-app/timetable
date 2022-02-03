import { IScheduleResponse, IClassesResponse } from '../interfaces';
import { CLASS_UNAVAILABLE, fetchDataSource, TeacherTimetable } from '../utils';
import { AMI_ASSAF_SYMBOL, SAMPLE_TEACHER } from '../utils/sample-constants';
import { ClassLookup } from '../utils';

describe('Test build schedule routine', () => {
  let classResponse: IClassesResponse;
  let teacherTimetable: TeacherTimetable;

  it('Fetches data from the server', async () => {
    classResponse = await fetchDataSource<IClassesResponse>(
      'classes',
      AMI_ASSAF_SYMBOL,
      0
    );
    expect(classResponse.Status.toLowerCase()).toEqual('success');
  });

  it('Builds a teacher timetable from class lookup', async () => {
    const classLookup = new ClassLookup(classResponse.Classes);
    teacherTimetable = new TeacherTimetable(SAMPLE_TEACHER);
    let scheduleResponse: IScheduleResponse;
    for (let grade of classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue;
        scheduleResponse = await fetchDataSource<IScheduleResponse>(
          'schedule',
          AMI_ASSAF_SYMBOL,
          classId
        );
        teacherTimetable.fromIscool(scheduleResponse.Schedule);
      }
    }
    console.log(JSON.stringify(teacherTimetable, null, 2));
  });

  /*it('Fetches schedule from server', async () => {
    schedule = new TeacherTimetable("רוזנבלום כרמית").fromIscool(scheduleResponse.Schedule);;
    //
  });*/
});
