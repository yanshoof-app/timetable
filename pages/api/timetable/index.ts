import { NextApiRequest, NextApiResponse } from 'next';
import { IChangesResponse, IScheduleResponse } from '../../../interfaces';
import { fetchDataSource, Timetable } from '../../../utils';
import {
  AMI_ASSAF_SYMBOL,
  SETTINGS,
  YUD_7_ID,
} from '../../../utils/sample-constants';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const timetable = new Timetable(SETTINGS);

    const { Schedule } = await fetchDataSource<IScheduleResponse>(
      'schedule',
      AMI_ASSAF_SYMBOL,
      YUD_7_ID
    );
    timetable.fromIscool(Schedule);

    const { Changes } = await fetchDataSource<IChangesResponse>(
      'changes',
      AMI_ASSAF_SYMBOL,
      YUD_7_ID
    );
    timetable.applyChanges(Changes);

    res.status(200).json({ timetable: timetable.lessons });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
