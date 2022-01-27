import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { IScheduleSettings } from '../../../interfaces';
import { buildFetchUrl, fetchDataSource } from '../../../utils/datasource';
import { Timetable } from '../../../utils/timetable/timetable';
import {
  IChangesResponse,
  IScheduleResponse,
} from '../../../utils/timetable/types';

const DEFAULT_SETTINGS: IScheduleSettings = {
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
const DEFAULT_SCHOOL = '460030';
const DEFAULT_CLASS = '28';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const timetable = new Timetable(DEFAULT_SETTINGS);

    const { Schedule } = await fetchDataSource<IScheduleResponse>(
      'schedule',
      DEFAULT_SCHOOL,
      DEFAULT_CLASS
    );
    timetable.fromIscool(Schedule);

    const { Changes } = await fetchDataSource<IChangesResponse>(
      'changes',
      DEFAULT_SCHOOL,
      DEFAULT_CLASS
    );
    timetable.applyChanges(Changes);

    res.status(200).json({ timetable: timetable.lessons });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
