import {
  DayOfWeek,
  HourOfDay,
  ILesson,
  ILessonArrMemberIscool,
  IModification,
  ITeacherLesson,
  ITimetable,
} from '../../interfaces'
import { initMatrix } from '../data/arrays'
import { Timetable } from './TimetableClass'

/**
 * A Teacher Timetable object than can be updated
 * @author Itay Schechner
 * @version 2022.0.1
 */
export class UpdatableTeacherTimetable implements ITimetable<ITeacherLesson> {
  readonly lessons: ITeacherLesson[][]

  constructor(commonTeacher: string) {
    // initialize array
    this.lessons = initMatrix<ITeacherLesson>(
      Timetable.DAYS_IN_WEEK,
      Timetable.HOURS_OF_SCHEDULE
    )
  }

  fromIscool(_schedule: ILessonArrMemberIscool[]): ITimetable<ITeacherLesson> {
    throw new Error('Method not implemented.')
  }

  public addLesson(day: DayOfWeek, hour: HourOfDay, lesson: ILesson) {
    this.lessons[day][hour] = lesson
  }

  public addChange(
    day: DayOfWeek,
    hour: HourOfDay,
    modification: IModification
  ) {
    this.lessons[day][hour] ||= {} as ITeacherLesson
    this.lessons[day][hour].changes.push(modification)
  }
}
