import { NextApiRequest, NextApiResponse } from 'next';
import { IChangesResponse, IScheduleResponse, IScheduleSettings } from '../../../interfaces';
import { fetchDataSource, Timetable } from '../../../utils';
import {
  AMI_ASSAF_SYMBOL,
  YUD_7_ID,
} from '../../../utils/sample-constants';
import { QueryParamsSettings  } from '../../../utils';
import { settings } from 'cluster';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = _req.query;
    let studyGroups = query.studyGroups;
    let SETTINGS = QueryParamsSettings.toQueryParams({
      showOthersChanges: Boolean(query.showOthersChanges),
      studyGroups: JSON.parse(query.studyGroups.toString()),
      studyGroupMap: new Map(JSON.parse(query.studyGroupsMap.toString()))
    });
    const timetable = new Timetable(new QueryParamsSettings(SETTINGS));

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

    res.status(200).json( JSON.stringify(timetable.lessons, null ,2) );
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
