import { Modification, LessonModification, ILesson } from '../interfaces';
import { IChangeIscool, ILessonIscool } from './schedule/types';
import { CLASS_UNAVAILABLE, ONLINE, ONLINE_ASYNCRONOUS } from './strings';

export class ISCOOL {
  static toClass(Te: string, Room: string): string {
    return Te == ''
      ? Room
      : Te == ONLINE
      ? ONLINE
      : Te == ONLINE_ASYNCRONOUS
      ? ONLINE_ASYNCRONOUS
      : CLASS_UNAVAILABLE;
  }
  static toChange(
    Subject: string,
    Teacher: String,
    change?: IChangeIscool
  ): Modification {
    if (
      !change ||
      change.StudyGroup.Subject != Subject ||
      change.StudyGroup.Teacher != Teacher
    )
      return {};

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
}
