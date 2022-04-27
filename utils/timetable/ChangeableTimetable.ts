import { ISCOOL, IStudyGroupIscool } from '@yanshoof/iscool'
import {
  DayOfWeek,
  DAYS_IN_WEEK,
  HourOfDay,
  HOURS_OF_DAY,
  IChange,
  ILesson,
  IModification,
  isStudyGroup,
  IStudyGroup,
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
   * Converts a change/event to addable into a timetable
   * @param change the change to convert
   * @returns a tuple of study group and modification
   */
  protected static toAddable(
    change: IChange
  ): [DayOfWeek, HourOfDay, IStudyGroup, IModification] {
    return [
      change.day,
      change.hour,
      { subject: change.subject, teacher: change.teacher },
      { modData: change.modData, modification: change.modification },
    ]
  }

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
   * Add changes to their places.
   * @param changes the changes of own user to add
   * @param othersChanges the changes of others to add
   * @param events the events to add
   */
  protected handleChanges(
    changes: IChange[],
    othersChanges: IChange[],
    events: IChange[]
  ) {
    changes.forEach((change) =>
      this.addChange(...ChangeableTimetable.toAddable(change))
    )
    othersChanges.forEach((change) =>
      this.addOthersChange(...ChangeableTimetable.toAddable(change))
    )
    events.forEach((event) =>
      this.addEvent(event.day, event.hour, event.modData)
    )
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
