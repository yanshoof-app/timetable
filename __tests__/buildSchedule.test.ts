import { IScheduleResponse } from '../utils/data/iScoolTypes';
import axios from 'axios';
import { buildFetchUrl } from '../utils/data/buildFetchUrl';
import buildFullSchedule from '../utils/data/buildSchedule';

const AMI_ASSAF_SYMBOL = '460030';
const YUD_7_CLASS_ID = 28;

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
    console.log(JSON.stringify(schedule, null, 2));
  });

  it;
});
