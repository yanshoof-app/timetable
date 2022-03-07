import { ILessonArrMemberIscool } from '.'
import { DayOfWeek, HourOfDay } from './iscool'
import { IChange, ILesson } from './lesson'

export interface ITimetable<TLesson> {
  readonly lessons: TLesson[][]
  /**
   * Reads Iscool schedule into the timetable
   * @param schedule an array of lesson array members as given by Iscool
   * @returns the this object, for optional chaining
   * @example
   * const timetable = new FullTimetable().fromIscool(Schedule);
   */
  fromIscool(schedule: ILessonArrMemberIscool[]): ITimetable<TLesson>
}

/** The object returned from the updates route */
export interface ITimetableUpdates {
  overrideTimetable?: ILesson[][]
  newChanges: IChange[]
  problems?: [DayOfWeek, HourOfDay][]
}
