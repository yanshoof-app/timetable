import { ILesson, IScheduleSettings, LessonOrMultiple } from '../../interfaces';
import { ISCOOL } from '../iScool';
import { applyChanges } from './applyChanges';
import {
  DAYS_IN_WEEK,
  HOURS_OF_SCHEDULE,
  IChangeIscool,
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

export function buildSchedule(
  schedule: ILessonArrMemberIscool[],
  changes: IChangeIscool[],
  settings: IScheduleSettings
): ILesson[][] {
  let result = initScheduleArr<ILesson>();

  schedule.forEach(lesson => {
    const day = lesson.Day;
    const hourIndex = lesson.Hour; // 0 hours are possible as well.
    const hourlyLessons = lesson.Lessons.map(ISCOOL.toLesson);

    if (!settings.studyGroupMap.has([day, hourIndex].join(',')))
      result[day][hourIndex] = hourlyLessons[0];
    else {
      // multiple lessons at same hour (i.e - math).
      // find lesson whose study group is present in the settings
      const groupIndex = settings.studyGroupMap.get([day, hourIndex].join(','));
      if (groupIndex == -1)
        // window at the current hour
        result[day][hourIndex] = null;
      else {
        const group = settings.studyGroups[groupIndex];
        result[day][hourIndex] =
          hourlyLessons.find(
            ({ subject, teacher }: ILesson) =>
              group[0] == subject && group[1] == teacher
          ) || null;
      }
    }
  });

  return applyChanges(result, changes, settings.showOthersChanges);
}
