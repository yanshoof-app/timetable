import axios from 'axios';

export type FetchFor = 'schedule' | 'changes' | 'classes';

export function buildFetchUrl(
  fetchFor: FetchFor,
  schoolId: string | number,
  classId: string | number = '0'
) {
  return `https://${process.env.BASE_URL}/api/student/${schoolId}/0/${fetchFor}/?token=${process.env.TOKEN}&clsId=${classId}`;
}

export async function fetchDataSource<T extends {}>(
  fetchFor: FetchFor,
  schoolId: string | number,
  classId: string | number
) {
  const url = buildFetchUrl(fetchFor, schoolId, classId);
  const res = await axios.get<T>(url);
  if (res.status != 200)
    throw new Error('Error fetching iscool server for ' + fetchFor);
  return res.data;
}
