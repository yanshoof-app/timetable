import { NextApiRequest, NextApiResponse } from 'next';
import { IChangesResponse, IScheduleResponse } from '../../../interfaces';
import { fetchDataSource, Timetable } from '../../../utils';
import { AMI_ASSAF_SYMBOL, YUD_7_ID } from '../../../utils/sample-constants';
import { QueryParamsSettings } from '../../../utils';
import { InputError } from '../../../interfaces/errors';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = _req.query;
    const settings = new QueryParamsSettings(query);
    const schoolSymbol = query.school.toString();
    const classId = query.classId.toString();
    const timetable = new Timetable(settings);

    const { Schedule } = await fetchDataSource<IScheduleResponse>(
      'schedule',
      schoolSymbol,
      classId
    );
    timetable.fromIscool(Schedule);

    const { Changes } = await fetchDataSource<IChangesResponse>(
      'changes',
      schoolSymbol,
      classId
    );
    timetable.applyChanges(Changes);
    res.status(200).json(JSON.stringify(timetable.lessons, null, 2));
  } catch (err: any) {
    res.status(500).json({
      statusCode: err.name == InputError.errorName ? 422 : 500,
      message: err.message,
    });
  }
};

export default handler;
