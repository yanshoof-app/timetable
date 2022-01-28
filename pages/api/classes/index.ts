import { NextApiRequest, NextApiResponse } from 'next';
import {
  ClassLookup,
  fetchDataSource,
  IClassesResponse,
} from '../../../utils/';
import { AMI_ASSAF_SYMBOL } from '../../../utils/sample-constants';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { Classes } = await fetchDataSource<IClassesResponse>(
      'classes',
      AMI_ASSAF_SYMBOL,
      0
    );
    const classLookup = new ClassLookup(Classes);

    res.status(200).json({ ...classLookup });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
