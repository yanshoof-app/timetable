import { IModification, LessonModification, ILesson } from '../interfaces';
import { IClass } from '../interfaces/class';
import { IChangeIscool, ILessonIscool } from './timetable/types';
import { CLASS_UNAVAILABLE, ONLINE, ONLINE_ASYNCRONOUS } from './strings';
import { IClassIscool } from './class/types';

export class ISCOOL {
  static toDate(date: string) {
    const milleseconds = date.match(/(\d+)/)[1];
    return new Date(Number(milleseconds));
  }
  static toClass(Te: string, Room: string): string {
    return Te == ''
      ? Room
      : Te == ONLINE
      ? ONLINE
      : Te == ONLINE_ASYNCRONOUS
      ? ONLINE_ASYNCRONOUS
      : CLASS_UNAVAILABLE;
  }
  static toModification(change?: IChangeIscool): IModification {
    switch (change.ChangeType) {
      case 'FreeLesson':
        return { modification: LessonModification.Canceled };
      case 'Exam':
        return { modification: LessonModification.Exam };
      case 'NewTeacher':
        return {
          modification: LessonModification.NewTeacher,
          modData: change.NewTeacher,
        };
      case 'NewRoom':
        return {
          modification: LessonModification.NewRoom,
          modData: change.NewRoom,
        };
      case 'NewHour':
        return {
          modification: LessonModification.NewHour,
          modData: change.NewHour,
        };
      default:
        return {
          modification: LessonModification.Other,
          modData: change.ChangeType + change.FixType,
        };
    }
  }
  static toLesson({ Subject, Teacher, Te, Room }: ILessonIscool): ILesson {
    return {
      subject: Subject,
      teacher: Teacher,
      class: ISCOOL.toClass(Te, Room),
    };
  }
  static toClassLookupResult({ Id, Grade, Number }: IClassIscool): IClass {
    return {
      id: Id,
      grade: Grade,
      class: Number,
    };
  }
}
