import { ILessonArrMemberIscool } from '.';

export interface ITimetable<TLesson> {
  readonly lessons: TLesson[][];
  /**
   * Reads Iscool schedule into the timetable
   * @param schedule an array of lesson array members as given by Iscool
   * @returns the this object, for optional chaining
   * @example
   * const timetable = new FullTimetable().fromIscool(Schedule);
   */
  fromIscool(schedule: ILessonArrMemberIscool[]): ITimetable<TLesson>;
}
