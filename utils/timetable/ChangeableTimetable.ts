import {
  DayOfWeek,
  DAYS_IN_WEEK,
  HourOfDay,
  HOURS_OF_DAY,
  IChange,
  ILesson,
  IModification,
  IStudyGroup,
  LessonModification,
} from '@yanshoof/types'
import { initMatrix } from '../data/arrays'

/**
 * Represents a timetable that changes cen be applied to
 * @author Itay Schechner
 * @version 1.0.0
 */
export class ChangeableTimetable {
  readonly lessons: ILesson[][]

  /**
   * Constructs a new changeable timetable
   * @param lessons the lessons to use, if existing
   */
  constructor(lessons?: ILesson[][]) {
    // initialize lesson matrix
    this.lessons = lessons
      ? lessons
      : initMatrix<ILesson>(DAYS_IN_WEEK, HOURS_OF_DAY)
  }

  /**
   * Applly changes to the existing schedule
   * @param changes the changes to apply
   */
  public applyChanges(changes: IChange[]) {
    for (let change of changes) {
      // check events
      if (
        !change.subject ||
        !change.teacher ||
        change.modification === LessonModification.Other
      ) {
        this.addEvent(change.day, change.hour, change.modData)
        continue
      }

      // check if change belongs to study group
    }
  }

  /**
   * Applies an event
   * @param day the day of the event
   * @param hour the hour of the event
   * @param modData the data of the event
   */
  protected addEvent(
    day: DayOfWeek,
    hour: HourOfDay,
    modData: IModification['modData']
  ) {
    this.lessons[day][hour].events ||= []
    this.lessons[day][hour].events.push(modData as string)
  }

  /**
   * Applies a change
   * @param day the day of the change
   * @param hour the hour of the change
   * @param studyGroup the studyGroup whose change apply to
   * @param modification the change
   */
  protected addChange(
    day: DayOfWeek,
    hour: HourOfDay,
    studyGroup: IStudyGroup,
    modification: IModification
  ) {
    this.lessons[day][hour].changes ||= []
    this.lessons[day][hour].changes.push({ ...studyGroup, ...modification })
  }

  /**
   * Applies a change of others
   * @param day the day of the change
   * @param hour the hour of the change
   * @param studyGroup the studyGroup whose change apply to
   * @param modification the change
   */
  protected addOthersChange(
    day: DayOfWeek,
    hour: HourOfDay,
    studyGroup: IStudyGroup,
    modification: IModification
  ) {
    this.lessons[day][hour].otherChanges ||= []
    this.lessons[day][hour].otherChanges.push({
      ...studyGroup,
      ...modification,
    })
  }
}
