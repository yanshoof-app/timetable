import { IScheduleResponse, IChangesResponse } from '../interfaces';
import {
  initMatrix,
  fetchDataSource,
  FullTimeable,
  Timetable,
  ISCOOL,
} from '../utils';
import {
  AMI_ASSAF_SYMBOL,
  YUD_7_ID,
  SETTINGS,
  OSHRI_SETTINGS,
} from '../utils/sample-constants';

describe('Test build schedule routine', () => {
  let scheduleResponse: IScheduleResponse;
  let changesResponse: IChangesResponse;

  it('Initializes a matrix', () => {
    const result = initMatrix(5, 8);
    expect(result.length).toEqual(5);
    expect(result[0].length).toEqual(8);
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
    const schedule = new FullTimeable().fromIscool(scheduleResponse.Schedule);
    expect(schedule.lessons.length).toEqual(7);
    expect(schedule.lessons[0][0][0].teacher).toBeDefined();
    expect(schedule.lessons[0][0][0].subject).toBeDefined();
  });

  it('Fetches changes from the server', async () => {
    changesResponse = await fetchDataSource<IChangesResponse>(
      'changes',
      AMI_ASSAF_SYMBOL,
      YUD_7_ID
    );
    expect(changesResponse.ClassId).toEqual(YUD_7_ID);
  });

  it('Creates an individual weekly schedule from it', () => {
    const schedule = new Timetable(SETTINGS).fromIscool(
      scheduleResponse.Schedule
    );
    expect(schedule.lessons[5][3]).toStrictEqual({});
    expect(schedule.lessons[0][1].subject).toEqual(SETTINGS.studyGroups[0][0]);
    expect(schedule.lessons[1][4].subject).toEqual(SETTINGS.studyGroups[3][0]);
    schedule.applyChanges(changesResponse.Changes);
    if (changesResponse.Changes.length) {
      const { Date, Hour } = changesResponse.Changes[0];
      const day = ISCOOL.toDate(Date).getDay();
      expect(
        schedule.lessons[day][Hour].modification ||
          schedule.lessons[day][Hour].otherChanges
      ).toBeDefined();
    }
    console.log(JSON.stringify(schedule, null, 2));
  });

  it('Creates a different individual weekly schedule from it', () => {
    const schedule = new Timetable(OSHRI_SETTINGS).fromIscool(
      scheduleResponse.Schedule
    );
    expect(schedule.lessons[5][3]).toStrictEqual({});
    expect(schedule.lessons[0][1].subject).toEqual(
      OSHRI_SETTINGS.studyGroups[0][0]
    );
    expect(schedule.lessons[1][4].subject).toEqual(
      OSHRI_SETTINGS.studyGroups[3][0]
    );
  });
});
