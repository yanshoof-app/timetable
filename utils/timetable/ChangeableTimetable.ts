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
   * Constructs a new changeable timetable
   * @param lessons the lessons to use, if existing
   * @param changes the changes to apply, if existing
   */
  constructor(lessons?: ILesson[][], changes?: IChange[]) {
    // initialize lesson matrix
    this.lessons = lessons
      ? lessons
      : initMatrix<ILesson>(DAYS_IN_WEEK, HOURS_OF_DAY)
    if (changes)
      changes.forEach(
        ({ subject, teacher, modData, modification, day, hour }) =>
          this.applyChange(
            day,
            hour,
            { subject, teacher },
            { modification, modData }
          )
      )
  }

  /**
   * Determines whether or not changes should be shown. Can be overriden
   * @param _day the day of the change
   * @param _hour the hour of the change
   * @param _studyGroup the study group of the change
   * @returns true if should show it, false otherwise
   */
  protected shouldShowOthersChanges(
    _day: DayOfWeek,
    _hour: HourOfDay,
    _studyGroup: IStudyGroup
  ): boolean {
    return true
  }

  /**
   * Applies a change
   * @param day the day of the change as given
   * @param hour the hour of the change as given
   * @param studyGroup the study group of the change, if given
   * @param modification the modification data
   */
  protected applyChange(
    day: DayOfWeek,
    hour: HourOfDay,
    studyGroup: IStudyGroup,
    modification: IModification
  ) {
    // check events
    if (!studyGroup || !studyGroup.subject || !studyGroup.teacher)
      this.addEvent(day, hour, modification.modData)

    const { teacher, subject } = this.lessons[day][hour]
    if (teacher == studyGroup.teacher && subject == studyGroup.subject)
      // change belongs to this study group
      this.addChange(day, hour, studyGroup, modification)
    else if (this.shouldShowOthersChanges(day, hour, studyGroup))
      this.addOthersChange(day, hour, studyGroup, modification)
  }

  /**
   * Applies an event
   * @param day the day of the event
   * @param hour the hour of the event
   * @param modData the data of the event
   */
  private addEvent(
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
  private addChange(
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
  private addOthersChange(
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
