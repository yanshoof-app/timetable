export type FetchFor = 'schedule' | 'changes' | 'classes';

export function buildFetchUrl(
  fetchFor: FetchFor,
  schoolId: string | number,
  classId: string | number = '0'
) {
  return `https://${process.env.BASE_URL}/api/student/${schoolId}/0/${fetchFor}/?token=${process.env.TOKEN}&clsId=${classId}`;
}
