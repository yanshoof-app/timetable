export const DAYS_IN_WEEK = 7;
export const HOURS_OF_SCHEDULE = 12; // change if needed

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
