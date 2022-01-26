import { DayOfWeek, HourOfDay, ILesson } from '../../interfaces';
import { CLASS_UNAVAILABLE, ONLINE, ONLINE_ASYNCRONOUS } from '../strings';

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
