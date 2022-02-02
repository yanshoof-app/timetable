import { IScheduleResponse, IChangesResponse, IClassesResponse } from '../interfaces';
import {
  initMatrix,
  fetchDataSource,
  Timetable,
  ISCOOL,
  TeacherTimetable,
} from '../utils';
import {
  AMI_ASSAF_SYMBOL,
  YUD_7_ID,
  SETTINGS,
} from '../utils/sample-constants';
import { ClassLookup } from '../utils';

describe('Test build schedule routine', () => {

  let scheduleResponse: IScheduleResponse;
  let changesResponse: IChangesResponse;
  let classResponse: IClassesResponse;

  it('Fetches data from the server', async () => {
    classResponse = await fetchDataSource<IClassesResponse>(
      'classes',
      AMI_ASSAF_SYMBOL,
      0
    );
    expect(classResponse.Status.toLowerCase()).toEqual('success');
  });

  it('Builds a class lookup array from it', () => {
    const classes = new ClassLookup(classResponse.Classes);

  });
  it('Fetches schedule from server', async () => {
    scheduleResponse = await fetchDataSource<IScheduleResponse>(
      'schedule',
      AMI_ASSAF_SYMBOL,
      YUD_7_ID
    );
    expect(scheduleResponse.ClassId).toEqual(YUD_7_ID);
  });

  it('Creates a weekly schedule from it', () => {
    const schedule = new TeacherTimetable("רוזנבלום כרמית").fromIscool(scheduleResponse.Schedule);
  });

  

});