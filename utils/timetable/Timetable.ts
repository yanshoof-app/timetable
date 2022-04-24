import {
  IChangeIscool,
  ILessonArrMemberIscool,
  ILessonIscool,
  ISCOOL,
} from '@yanshoof/iscool'
import { Settings } from '@yanshoof/settings'
import {
  IChange,
  ILesson,
  ITimetable,
  LessonModification,
} from '@yanshoof/types'
import { ChangeableTimetable } from './ChangeableTimetable'

/**
 * A Timetable class capable of reading settings and changes
 * @author Itay Schechner
 * @version 2022.0.0
 */
export class Timetable
  extends ChangeableTimetable
  implements ITimetable<ILesson, ILessonArrMemberIscool[]>
{
  private settings: Settings<ILessonIscool>

  /**
   * Constructs a new Timetable Object
   * @param settings the settings to use
   */
  constructor(settings: Settings<ILessonIscool>) {
    super()
    this.settings = settings
  }

  public fromSchedule(
    schedule: ILessonArrMemberIscool[]
  ): ITimetable<ILesson, ILessonArrMemberIscool[]> {
    for (let lesson of schedule) {
      const day = lesson.Day
      const hour = lesson.Hour // 0 hours are possible as well.
      const hourlyLessons = lesson.Lessons

      this.lessons[day][hour] = ISCOOL.toLesson(
        this.settings.selectLesson(day, hour, hourlyLessons)
      )
    } // end of for
    return this
  }

  /**
   * Apply changes from iscool
   * @param changes the changes as sent by iscool
   */
  public applyIscoolChanges(changes: IChangeIscool[]) {
    super.applyChanges(changes.map(ISCOOL.toChange))
  }

  /**
   * The problems in the settings of the timetable
   */
  get problems() {
    return this.settings.problems
  }

  /**
   *
   * @param lastUserUpdate the last time the user updated it's schedule
   * @param changes the changes as given from ISCOOL
   * @returns new changes
   */
  public static newChanges(lastUserUpdate: Date, changes: IChangeIscool[]) {
    let newChanges: IChange[] = []

    //collect changes
    for (let change of changes) {
      const changeDate = ISCOOL.toDate(change.Date)

      // check whether there are no more new changes
      if (changeDate < lastUserUpdate) break

      // event detected
      if (change.StudyGroup == null) {
        newChanges.push(ISCOOL.toEvent(change))
        continue
      }

      newChanges.push(ISCOOL.toChange(change))
    }

    return { newChanges }
  }
}
