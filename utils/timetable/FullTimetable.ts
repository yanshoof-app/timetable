import {
  DAYS_IN_WEEK,
  HOURS_OF_DAY,
  ITimetable,
  LessonOrMultiple,
} from '../../interfaces'
import { initMatrix } from '..'
import { ILessonArrMemberIscool, ISCOOL } from '@yanshoof/iscool'

/**
 * A class that implements timetable but stays loyal to the original Iscool API
 * @author Itay Schechner
 * @version 2022.0.0
 * @implements ITimeTable<LessonOrMultiple>
 */
export class FullTimeable
  implements ITimetable<LessonOrMultiple, ILessonArrMemberIscool[]>
{
  readonly lessons: LessonOrMultiple[][]

  /**
   * Creates an empty timetable object
   */
  constructor() {
    this.lessons = initMatrix(DAYS_IN_WEEK, HOURS_OF_DAY)
  }

  public fromSchedule(schedule: ILessonArrMemberIscool[]) {
    schedule.forEach((lesson) => {
      const day = lesson.Day
      const hourIndex = lesson.Hour

      this.lessons[day][hourIndex] = lesson.Lessons.sort((sgA, sgB) =>
        sgA.Teacher > sgB.Teacher ? 1 : -1
      ).map(ISCOOL.toLesson)
    })
    return this
  }
}
