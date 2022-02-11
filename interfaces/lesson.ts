import { type } from 'os';
import { DayOfWeek, HourOfDay } from '.';

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
 * Represents a modification. Determines a study group and the exact modification to it@extends IModification for listing any changes made for the lesson
 * @extends IStudyGroup to specify the teacher and the subject
 */
export interface IStudyGroupWithModification
  extends IStudyGroup,
    IModification {}

/**
 * Represents a lesson.
 * @extends IStudyGroupWithModification for listing the study group and possible modifications to it
 * @field class a string specifying where the lesson will be taking place
 * @field otherChanges an array of other combinations of study groups and modifications done by the time this lesson is taking place.
 */
export interface ILesson extends IStudyGroupWithModification {
  class: string; // Room string / Zoom / Async
  otherChanges?: IStudyGroupWithModification[];
}

export function isILessonObj(obj: unknown): obj is ILesson {
  return (
    typeof obj == 'object' &&
    'subject' in obj &&
    'teacher' in obj &&
    'class' in obj
  );
}

export type ITeacherLesson = Omit<ILesson, 'teacher'>;

/**
 * Represents a change in the schedule.
 * @extends IStudyGroupWithModification for listing the study group and possible modifications to it
 * @field day for the day the change will take into effect
 * @field hour for the hour of day the change will take into effect
 */
export interface IChange extends IStudyGroupWithModification {
  day: DayOfWeek;
  hour: HourOfDay;
}
