import { ILesson, LessonModification, Modification } from '../../interfaces';
import { CLASS_UNAVAILABLE, ONLINE, ONLINE_ASYNCRONOUS } from '../strings';

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type HourOfDay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IStudyGroupIscool {
  Teacher: string;
  Subject: string;
}

export interface ILessonIscool extends IStudyGroupIscool {
  Room: string;
  Note: string;
  Te: string; // zoom or asyncronous
}

export interface ILessonArrMemberIscool {
  Day: DayOfWeek;
  Hour: HourOfDay;
  Lessons: ILessonIscool[];
}

type IscoolChangeType =
  | 'FreeLesson'
  | 'Exam'
  | 'NewTeacher'
  | 'NewRoom'
  | 'NewHour';

export interface IChangeIscool {
  Date: Date;
  Hour: HourOfDay;
  ChangeType: IscoolChangeType;
  FixType: string;
  StudyGroup: IStudyGroupIscool;
  NewRoom: string;
  NewTeacher: string;
  NewHour: HourOfDay;
}

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

export interface IChangesResponse {
  ClassId: number;
  Changes: IChangeIscool[];
  Status: string;
}

export interface IScheduleResponse {
  ClassId: number;
  Schedule: ILessonArrMemberIscool[];
  Status: string;
}
