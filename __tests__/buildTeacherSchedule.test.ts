import { IScheduleResponse, IChangesResponse, IClassesResponse } from '../interfaces';
import {
  initMatrix,
  fetchDataSource,
  Timetable,
  ISCOOL,
  FullTimeable,
  TeacherTimetable,
} from '../utils';
import {
  AMI_ASSAF_SYMBOL,
  YUD_7_ID,
  SETTINGS,
} from '../utils/sample-constants';
import { ClassLookup } from '../utils';

describe('Test build schedule routine', () => {

  let classResponse: IClassesResponse;
  let scheduleResponse;
  let schedule;

  it('Fetches data from the server', async () => {
    classResponse = await fetchDataSource<IClassesResponse>(
      'classes',
      AMI_ASSAF_SYMBOL,
      0
    );
    expect(classResponse.Status.toLowerCase()).toEqual('success');
  });


  it('Fetches schedule from server', async () => {
    const classes = new ClassLookup(classResponse.Classes)
    classes.classIds.forEach(grade => {
      grade.forEach(async thisClass => {
        console.log(thisClass);
        scheduleResponse = await fetchDataSource<IScheduleResponse>(
          'schedule',
          AMI_ASSAF_SYMBOL,
          thisClass.toString()
        )
        console.log(scheduleResponse);
      });
    });
  });
  
  /*it('Fetches schedule from server', async () => {
    schedule = new TeacherTimetable("רוזנבלום כרמית").fromIscool(scheduleResponse.Schedule);;
    //console.log(JSON.stringify(schedule));
  });*/  

});