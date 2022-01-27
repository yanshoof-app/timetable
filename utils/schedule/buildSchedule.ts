import { LessonOrMultiple } from '../../interfaces';
import { ISCOOL } from '../iScool';
import { ILessonArrMemberIscool } from './types';

export default function buildFullSchedule(
  schedule: ILessonArrMemberIscool[]
): LessonOrMultiple[][] {
  let result: LessonOrMultiple[][] = new Array(7);
  for (let i = 0; i < 7; i++) result[i] = new Array(12);
  schedule.forEach(lesson => {
    const day = lesson.Day;
    const hourIndex = lesson.Hour - 1;

    result[day][hourIndex] = lesson.Lessons.map(ISCOOL.toLesson);
  });
  return result;
}
