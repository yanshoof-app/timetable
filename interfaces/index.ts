export enum LessonModification {
  None = 0,
  Canceled,
  Exam,
  NewTeacher,
  NewRoom,
  NewHour,
  Other,
}

export interface Modification {
  modification?: LessonModification;
  modData?: string | number; // modification data if needed
}

export interface ILesson extends Modification {
  subject: string;
  teacher: string;
  class: string; // Room string / Zoom / Async
}

export type LessonOrMultiple = ILesson[];
