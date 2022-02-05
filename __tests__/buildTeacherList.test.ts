import {
    IScheduleResponse,
    IClassesResponse,
} from '../interfaces';
import { fetchDataSource, ClassLookup } from '../utils';
import { AMI_ASSAF_SYMBOL } from '../utils/sample-constants';
import { TeacherList } from '../utils/teacherList/TeacherList';
  
describe('Test build schedule routine', () => {
    let classLookup: ClassLookup;
    let teachers: TeacherList;
  
    it('Fetches data from the server', async () => {
      const classResponse = await fetchDataSource<IClassesResponse>(
        'classes',
        AMI_ASSAF_SYMBOL,
        0
      );
      expect(classResponse.Status.toLowerCase()).toEqual('success');
      classLookup = new ClassLookup(classResponse.Classes);
    });
  
    it('Builds a teacher list from class lookup', async () => {
      teachers = new TeacherList();
      let scheduleResponse: IScheduleResponse;
      for (let grade of classLookup.classIds) {
        for (let classId of grade) {
          if (classId == ClassLookup.CLASS_NOT_FOUND) continue;
          scheduleResponse = await fetchDataSource<IScheduleResponse>(
            'schedule',
            AMI_ASSAF_SYMBOL,
            classId
          );
          teachers.fromIscool(scheduleResponse.Schedule);
        }
      }
      console.log(JSON.stringify(teachers.teachers, null, 2));
    });
})