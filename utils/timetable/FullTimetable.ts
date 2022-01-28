import { LessonOrMultiple } from '../../interfaces';
import { ISCOOL } from '../iScool';
import { initMatrix } from '../arrays';
import { Timetable } from './TimetableClass';
import { ILessonArrMemberIscool, ITimetable } from './types';

// timetable API for table without changes or settings
export class FullTimeable implements ITimetable<LessonOrMultiple> {
  readonly lessons: LessonOrMultiple[][];

  constructor() {
    this.lessons = initMatrix(
      Timetable.DAYS_IN_WEEK,
      Timetable.HOURS_OF_SCHEDULE
    );
  }

  public fromIscool(schedule: ILessonArrMemberIscool[]) {
    schedule.forEach(lesson => {
      const day = lesson.Day;
      const hourIndex = lesson.Hour - 1;

      this.lessons[day][hourIndex] = lesson.Lessons.map(ISCOOL.toLesson);
    });
    return this;
  }
}
