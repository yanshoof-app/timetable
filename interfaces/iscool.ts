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
  Date: string; // why tho??
  Hour: HourOfDay;
  ChangeType: IscoolChangeType;
  FixType: string;
  StudyGroup: IStudyGroupIscool;
  NewRoom: string;
  NewTeacher: string;
  NewHour: HourOfDay;
}

/**
 * Represents the class type as given by iscool
 */
export interface IClassIscool {
  Id: number;
  Grade: number;
  Number: number;
  //Name: string;
}

/**
 * Checks if a given object is an instance of IClassIscool
 * @param obj the object to check
 * @returns true if all fields of the IClassIscool interface are present in the object
 */
export function isIscoolClass(obj: any): obj is IClassIscool {
  return 'Id' in obj && 'Grade' in obj && 'Number' in obj;
}

/**
 * The response received from Iscool when fetching for classes
 */
export interface IClassesResponse {
  ClassId: number; // why tho??
  Classes: IClassIscool[];
  Status: string;
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
