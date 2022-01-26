import 'mocha';
import { IScheduleResponse } from '../utils/data/iScoolTypes';
import fetch from 'node-fetch';
import { buildFetchUrl } from '../utils/data/buildFetchUrl';
import { expect } from 'chai';

const AMI_ASSAF_SYMBOL = '460030';
const YUD_7_CLASS_ID = 28;

describe('Test build schedule routine', () => {
  let responseBody: IScheduleResponse;
  let url = buildFetchUrl('schedule', AMI_ASSAF_SYMBOL, YUD_7_CLASS_ID);

  it('Fetches schedule from server', async () => {
    console.log('Fetching data from', url);
    const response = await fetch(url);
    expect(response.status).to.equal(200, 'Fetch Failed');
    responseBody = (await response.json()) as IScheduleResponse;
    expect(responseBody.ClassId).to.equal(YUD_7_CLASS_ID, 'Parsing Failed');
    console.log(responseBody);
  });
});
