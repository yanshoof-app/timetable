import { LessonOrMultiple } from '../../interfaces';
import { ISCOOL } from '../iScool';
import {
  DAYS_IN_WEEK,
  HOURS_OF_SCHEDULE,
  ILessonArrMemberIscool,
} from './types';

function initScheduleArr<T = LessonOrMultiple>(): T[][] {
  const result: T[][] = new Array<T[]>(DAYS_IN_WEEK);
  for (let i = 0; i < DAYS_IN_WEEK; i++)
    result[i] = new Array<T>(HOURS_OF_SCHEDULE);
  return result;
}

export function buildFullSchedule(
  schedule: ILessonArrMemberIscool[]
): LessonOrMultiple[][] {
  let result = initScheduleArr<LessonOrMultiple>();
  schedule.forEach(lesson => {
    const day = lesson.Day;
    const hourIndex = lesson.Hour - 1;

    result[day][hourIndex] = lesson.Lessons.map(ISCOOL.toLesson);
  });
  return result;
}
