import { IScheduleResponse } from '../utils/schedule/types';
import axios from 'axios';
import {
  buildFullSchedule,
  buildSchedule,
} from '../utils/schedule/buildSchedule';
import { buildFetchUrl } from '../utils/buildFetchUrl';
import { IScheduleSettings } from '../interfaces';

const AMI_ASSAF_SYMBOL = '460030';
const YUD_7_CLASS_ID = 28;
const SETTINGS: IScheduleSettings = {
  showOthersChanges: true,
  studyGroups: [
    ['כימיה', 'זרסקי יפעת'],
    ['מתמטיקה 5', 'טיראן חוה'],
    ['חנ"ג בנים', 'פריזה אמיר'],
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
  let responseBody: IScheduleResponse;
  let url = buildFetchUrl('schedule', AMI_ASSAF_SYMBOL, YUD_7_CLASS_ID);

  it('Fetches schedule from server', async () => {
    console.log('Fetching data from', url);
    const response = await axios.get<IScheduleResponse>(url);
    expect(response.status).toEqual(200);
    responseBody = response.data;
    expect(responseBody.ClassId).toEqual(YUD_7_CLASS_ID);
  });

  it('Creates a weekly schedule from it', () => {
    const schedule = buildFullSchedule(responseBody.Schedule);
    expect(schedule.length).toEqual(7);
    expect(schedule[0][0][0].teacher).toBeDefined();
    expect(schedule[0][0][0].subject).toBeDefined();
  });

  it('Creates an individual weekly schedule from it', () => {
    const schedule = buildSchedule(responseBody.Schedule, [], SETTINGS);
    expect(schedule[5][3]).toBeNull();
    expect(schedule[0][1].subject).toEqual('כימיה');
    expect(schedule[1][4].subject).toEqual('אנגלית 5');
    console.log(JSON.stringify(schedule, null, 2));
  });

  it;
});
