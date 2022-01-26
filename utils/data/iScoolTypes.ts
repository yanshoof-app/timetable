import { ILesson } from '../../interfaces';
import { CLASS_UNAVAILABLE, ONLINE, ONLINE_ASYNCRONOUS } from '../strings';

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type HourOfDay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ILessonIscool {
  Teacher: string;
  Subject: string;
  Room: string;
  Note: string;
  Te: string; // zoom or asyncronous
}

export interface ILessonArrMemberIscool {
  Day: DayOfWeek;
  Hour: HourOfDay;
  Lessons: ILessonArrMemberIscool[];
}

export namespace ISCOOL {
  function toClass(Te: string, Room: string): string {
    return Te == ''
      ? Room
      : Te == ONLINE
      ? ONLINE
      : Te == ONLINE_ASYNCRONOUS
      ? ONLINE_ASYNCRONOUS
      : CLASS_UNAVAILABLE;
  }
  function toLesson({ Subject, Teacher, Te, Room }: ILessonIscool): ILesson {
    return {
      subject: Subject,
      teacher: Teacher,
      class: toClass(Te, Room),
    };
  }
}
