export enum LessonModification {
  None = 0,
  Canceled,
  Exam,
  NewTeacher,
  NewRoom,
  NewHour,
  Other,
}

export interface IModification {
  modification?: LessonModification;
  modData?: string | number; // modification data if needed
}

export interface IStudyGroup {
  subject: string;
  teacher: string;
}

export interface ILesson extends IStudyGroup, IModification {
  class: string; // Room string / Zoom / Async
  otherChanges?: (IModification & IStudyGroup)[];
}

export type LessonOrMultiple = ILesson[];
