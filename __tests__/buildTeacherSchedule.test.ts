import {
  IScheduleResponse,
  IClassesResponse,
  IChangesResponse,
} from '../interfaces';
import { CLASS_UNAVAILABLE, fetchDataSource, TeacherTimetable } from '../utils';
import { AMI_ASSAF_SYMBOL, SAMPLE_TEACHER } from '../utils/sample-constants';
import { ClassLookup } from '../utils';

describe('Test build schedule routine', () => {
  //jest.setTimeout(40000);
  let classLookup: ClassLookup;
  let teacherTimetable: TeacherTimetable;

  it('Fetches data from the server', async () => {
    const classResponse = await fetchDataSource<IClassesResponse>(
      'classes',
      AMI_ASSAF_SYMBOL,
      0
    );
    expect(classResponse.Status.toLowerCase()).toEqual('success');
    classLookup = new ClassLookup(classResponse.Classes);
  });

  it('Builds a teacher timetable from class lookup', async () => {
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

  it('Applies changed made this week', async () => {
    let changesResponse: IChangesResponse;
    for (let grade of classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue;
        changesResponse = await fetchDataSource<IChangesResponse>(
          'changes',
          AMI_ASSAF_SYMBOL,
          classId
        );
        teacherTimetable.applyChanges(changesResponse.Changes);
      }
    }
    console.log(JSON.stringify(teacherTimetable, null, 2));
  });
});
