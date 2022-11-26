import { ITeacherLesson, DayOfWeek, HourOfDay, ILesson, IModification, DAYS_IN_WEEK, HOURS_OF_DAY } from "@yanshoof/types"
import { initMatrix } from "../data/arrays"


/**
 * A Teacher Timetable object than can be updated
 * @author Itay Schechner
 * @version 2022.0.1
 */
export class UpdatableTeacherTimetable {
  readonly lessons: ITeacherLesson[][]

  constructor(commonTeacher: string) {
    // initialize array
    this.lessons = initMatrix<ITeacherLesson>(
      DAYS_IN_WEEK,
      HOURS_OF_DAY
    )
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