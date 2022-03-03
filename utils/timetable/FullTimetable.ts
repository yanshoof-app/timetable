import {
  ILesson,
  ILessonArrMemberIscool,
  ITimetable,
  LessonOrMultiple,
} from '../../interfaces'
import { ISCOOL } from '..'
import { initMatrix } from '..'
import { Timetable } from './TimetableClass'

/**
 * A class that implements timetable but stays loyal to the original Iscool API
 * @author Itay Schechner
 * @version 2022.0.0
 * @implements ITimeTable<LessonOrMultiple>
 */
export class FullTimeable implements ITimetable<LessonOrMultiple> {
  readonly lessons: LessonOrMultiple[][]

  /**
   * Creates an empty timetable object
   */
  constructor() {
    this.lessons = initMatrix(
      Timetable.DAYS_IN_WEEK,
      Timetable.HOURS_OF_SCHEDULE
    )
  }

  public fromIscool(schedule: ILessonArrMemberIscool[]) {
    schedule.forEach((lesson) => {
      const day = lesson.Day
      const hourIndex = lesson.Hour

      this.lessons[day][hourIndex] = lesson.Lessons.map(ISCOOL.toLesson)
    })
    return this
  }
}
