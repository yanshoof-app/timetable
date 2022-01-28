import { IChangesResponse, IScheduleResponse } from '../utils/timetable/types';
import axios from 'axios';
import { buildFetchUrl } from '../utils/datasource';
import { IScheduleSettings } from '../interfaces';
import { FullTimeable } from '../utils/timetable/FullTimetable';
import { Timetable } from '../utils/timetable/timetable';
import { initMatrix } from '../utils/arrays';
import { ISCOOL } from '../utils/iScool';

const AMI_ASSAF_SYMBOL = '460030';
const YUD_7_CLASS_ID = 28;
const SETTINGS: IScheduleSettings = {
  showOthersChanges: true,
  studyGroups: [
    ['כימיה', 'זרסקי יפעת'],
    ['מתמטיקה 5', 'טיראן חוה'],
    ['חנג בנים', 'פריזה אמיר'],
    ['אנגלית 5', 'ורגוליס ארתור'],
    ['מדעי המחשב יחל 1', 'זבלינסקי קונסטנטין'],
  ],
  studyGroupMap: new Map([
    ['0,1', 0],
    ['0,2', 0],
    ['0,5', 1],
    ['0,6', 1],
    ['0,7', 2],
    ['0,8', -1],
    ['0,9', -1],
    ['1,4', 3],
    ['1,5', 3],
    ['1,6', 0],
    ['1,7', -1],
    ['1,8', -1],
    ['1,9', -1],
    ['2,1', 1],
    ['2,2', 1],
    ['2,5', 4],
    ['2,6', 4],
    ['2,8', -1],
    ['2,9', -1],
    ['2,10', 1],
    ['3,0', 1],
    ['3,3', -1],
    ['3,4', 4],
    ['3,6', 3],
    ['3,7', -1],
    ['3,8', 0],
    ['3,9', -1],
    ['4,3', 3],
    ['4,4', 3],
    ['4,6', 2],
    ['4,7', -1],
    ['4,8', -1],
    ['4,9', -1],
    ['5,1', -1],
    ['5,2', -1],
    ['5,3', -1],
  ]),
};

const OSHRI_SETTINGS: IScheduleSettings = {
  showOthersChanges: true,
  studyGroups: [
    ['פיזיקה מואצת', 'רוזנבלום כרמית'],
    ['מתמטיקה 5', 'טיראן חוה'],
    ['חנג בנים', 'פריזה אמיר'],
    ['אנגלית 5', 'ורגוליס ארתור'],
    ['הנדסת תוכנה יח"ל 1-2', 'כהן ורד'],
  ],
  studyGroupMap: new Map([
    ['0,1', 0],
    ['0,2', 0],
    ['0,5', 1],
    ['0,6', 1],
    ['0,7', 2],
    ['0,8', -1],
    ['0,9', -1],
    ['1,4', 3],
    ['1,5', 3],
    ['1,6', 0],
    ['1,7', -1],
    ['1,8', -1],
    ['1,9', -1],
    ['2,1', 1],
    ['2,2', 1],
    ['2,5', 4],
    ['2,6', 4],
    ['2,8', -1],
    ['2,9', -1],
    ['2,10', 1],
    ['3,3', -1],
    ['3,4', 4],
    ['3,6', 3],
    ['3,7', -1],
    ['3,8', 0],
    ['3,9', -1],
    ['4,3', 3],
    ['4,4', 3],
    ['4,6', 2],
    ['4,7', -1],
    ['4,8', -1],
    ['4,9', -1],
    ['5,1', -1],
    ['5,2', -1],
    ['5,3', -1],
  ]),
};

describe('Test build schedule routine', () => {
  let scheduleResponse: IScheduleResponse;
  let scheduleUrl = buildFetchUrl('schedule', AMI_ASSAF_SYMBOL, YUD_7_CLASS_ID);
  let changesResponse: IChangesResponse;
  let changesUrl = buildFetchUrl('changes', AMI_ASSAF_SYMBOL, YUD_7_CLASS_ID);

  it('Initializes a matrix', () => {
    const result = initMatrix(5, 8);
    expect(result.length).toEqual(5);
    expect(result[0].length).toEqual(8);
  });

  it('Fetches schedule from server', async () => {
    const response = await axios.get<IScheduleResponse>(scheduleUrl);
    expect(response.status).toEqual(200);
    scheduleResponse = response.data;
    expect(scheduleResponse.ClassId).toEqual(YUD_7_CLASS_ID);
  });

  it('Creates a weekly schedule from it', () => {
    const schedule = new FullTimeable().fromIscool(scheduleResponse.Schedule);
    expect(schedule.lessons.length).toEqual(7);
    expect(schedule.lessons[0][0][0].teacher).toBeDefined();
    expect(schedule.lessons[0][0][0].subject).toBeDefined();
  });

  it('Fetches changes from the server', async () => {
    const response = await axios.get<IChangesResponse>(changesUrl);
    expect(response.status).toEqual(200);
    changesResponse = response.data;
    expect(scheduleResponse.ClassId).toEqual(YUD_7_CLASS_ID);
  });

  it('Creates an individual weekly schedule from it', () => {
    const schedule = new Timetable(SETTINGS).fromIscool(
      scheduleResponse.Schedule
    );
    expect(schedule.lessons[5][3]).toStrictEqual({});
    expect(schedule.lessons[0][1].subject).toEqual(SETTINGS.studyGroups[0][0]);
    expect(schedule.lessons[1][4].subject).toEqual(SETTINGS.studyGroups[3][0]);
    schedule.applyChanges(changesResponse.Changes);
    const { Date, Hour } = changesResponse.Changes[0];
    const day = ISCOOL.toDate(Date).getDay();
    expect(
      schedule.lessons[day][Hour].modification ||
        schedule.lessons[day][Hour].otherChanges
    ).toBeDefined();
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
