import { LessonOrMultiple } from '../../interfaces';
import { ISCOOL } from '../iScool';
import {
  DAYS_IN_WEEK,
  HOURS_OF_SCHEDULE,
  ILessonArrMemberIscool,
} from './types';

export default function buildFullSchedule(
  schedule: ILessonArrMemberIscool[]
): LessonOrMultiple[][] {
  let result: LessonOrMultiple[][] = new Array(DAYS_IN_WEEK);
  for (let i = 0; i < DAYS_IN_WEEK; i++)
    result[i] = new Array(HOURS_OF_SCHEDULE);
  schedule.forEach(lesson => {
    const day = lesson.Day;
    const hourIndex = lesson.Hour - 1;

    result[day][hourIndex] = lesson.Lessons.map(ISCOOL.toLesson);
  });
  return result;
}
