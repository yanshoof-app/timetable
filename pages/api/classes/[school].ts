import { NextApiRequest, NextApiResponse } from 'next';
import { IClassesResponse } from '../../../interfaces';
import { ClassLookup, fetchDataSource } from '../../../utils';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    let school = _req.query.school.toString();
    const { Classes } = await fetchDataSource<IClassesResponse>(
      'classes',
      school,
      0
    );
    const classLookup = new ClassLookup(Classes);

    res.status(200).json({ ...classLookup });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
