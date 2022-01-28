import { NextApiRequest, NextApiResponse } from 'next';
import { ClassLookup } from '../../../utils/class';
import { IClassesResponse } from '../../../utils/class/types';
import { fetchDataSource } from '../../../utils/datasource';

const DEFAULT_SCHOOL = '460030';
const DEFAULT_CLASS = 0;

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { Classes } = await fetchDataSource<IClassesResponse>(
      'classes',
      DEFAULT_SCHOOL,
      DEFAULT_CLASS
    );
    const classLookup = new ClassLookup(Classes);

    res.status(200).json({ ...classLookup });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
