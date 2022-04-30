import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
    let query = _req.query;
    console.log((_req.cookies.timetable));
  try {
    res.status(200).json({ ...[query] });
  }
  catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

export default handler;