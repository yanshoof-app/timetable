import { IscoolClassLookup } from '@yanshoof/iscool'
import { NextApiRequest, NextApiResponse } from 'next'

export type ClassesRequest = { classes: number[][]; grades: number[] }

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const query = _req.query
    const schoolSymbol = query.school as string
    const classLookup = await IscoolClassLookup.fromSchool(schoolSymbol)

    res.status(200).json(<ClassesRequest>{
      classes: classLookup.classIds,
      grades: classLookup.grades,
    })
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
