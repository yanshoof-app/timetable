import { type } from "os";

/**
 * An enum of possible modifications done to a lesson
 */
export enum LessonModification {
  None = 0,
  Canceled,
  Exam,
  NewTeacher,
  NewRoom,
  NewHour,
  Other,
}

/**
 * A combination of an optionsl modification and optional data
 */
export interface IModification {
  modification?: LessonModification;
  modData?: string | number; // modification data if needed
}

/**
 * A combination of a teacher and a subject
 */
export interface IStudyGroup {
  subject: string;
  teacher: string;
}

/**
 * Represents a lesson.
 * @extends IModification for listing any changes made for the lesson
 * @extends IStudyGroup to specify the teacher and the subject
 * @field class a string specifying where the lesson will be taking place
 * @field otherChanges an array of other combinations of study groups and modifications done by the time this lesson is taking place.
 */
export interface ILesson extends IStudyGroup, IModification {
  class: string; // Room string / Zoom / Async
  otherChanges?: (IModification & IStudyGroup)[];
}


export type ITeacherLesson = Omit<ILesson, "teacher"> 