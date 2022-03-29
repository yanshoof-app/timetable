import {
  DayOfWeek,
  HourOfDay,
  IChange,
  IChangeIscool,
  ILesson,
  ILessonArrMemberIscool,
  IModification,
  IScheduleSettings,
  isILessonObj,
  isSettingsObj,
  isStudyGroup,
  IStudyGroup,
  IStudyGroupIscool,
  ITimetable,
} from '../../interfaces'
import { ISCOOL } from '..'
import { initMatrix } from '..'
import { isMatrix } from '../data/arrays'
import { isPickableHour } from './pickableHour'

/**
 * A Timetable class capable of reading settings and changes
 * @author Itay Schechner
 * @version 2022.0.0
 */
export class Timetable implements ITimetable<ILesson> {
  static readonly DAYS_IN_WEEK = 7
  static readonly HOURS_OF_SCHEDULE = 13 // change if needed
  readonly lessons: ILesson[][]
  private settings: IScheduleSettings | { showOthersChanges: boolean }
  readonly problems: [DayOfWeek, HourOfDay][]

  /**
   * Creates a timetable object with given settings
   * @param settings the schedule settings object, determining which lesson of multiple will be used
   */
  constructor(settings: IScheduleSettings)

  /**
   * Creates a timetable object with existing lessons
   * @param existing the lessons to put in the timetable
   */
  constructor(existing: ILesson[][], showOthersChanges: boolean)

  constructor(...args: unknown[]) {
    const [arg, showOthersChanges] = args
    if (!arg || (showOthersChanges && typeof showOthersChanges != 'boolean'))
      throw new Error('Invalid values in constructor')
    else if (isSettingsObj(arg)) {
      // initialize array
      this.lessons = initMatrix<ILesson>(
        Timetable.DAYS_IN_WEEK,
        Timetable.HOURS_OF_SCHEDULE
      )
      this.settings = arg
      this.problems = []
    } else if (isMatrix(arg) && isILessonObj(arg[0][0])) {
      this.lessons = arg as ILesson[][]
      this.settings = { showOthersChanges: showOthersChanges as boolean }
    } else throw new Error('Invalid values in constructor')
  }

  public fromIscool(schedule: ILessonArrMemberIscool[]) {
    if (!isSettingsObj(this.settings))
      throw new Error(
        'Cannot call method "fromIscool()" method without proper settings'
      )

    const { studyGroups, studyGroupMap } = this.settings
    for (let lesson of schedule) {
      const day = lesson.Day
      const hourIndex = lesson.Hour // 0 hours are possible as well.
      const hourlyLessons = lesson.Lessons.map(ISCOOL.toLesson)

      if (!studyGroupMap.has([day, hourIndex].join(','))) {
        this.lessons[day][hourIndex] = hourlyLessons[0]
        if (hourlyLessons.length > 1) this.problems.push([day, hourIndex])
        continue
      }

      // manually add a "problem" on pickable hours to force pick
      if (
        isPickableHour(day, hourIndex) &&
        !studyGroupMap.has([day, hourIndex].join(','))
      )
        this.problems.push([day, hourIndex])

      // multiple lessons at same hour (i.e - math).
      // find lesson whose study group is present in the settings
      const groupIndex = studyGroupMap.get([day, hourIndex].join(','))
      if (groupIndex == -1) {
        // window at the current hour
        this.lessons[day][hourIndex] = {} as ILesson
        continue
      }

      const [groupSubject, groupTeacher] = studyGroups[groupIndex]
      this.lessons[day][hourIndex] = hourlyLessons.find(
        ({ subject, teacher }: ILesson) =>
          groupSubject == subject && groupTeacher == teacher
      )

      if (!this.lessons[day][hourIndex]) this.problems.push([day, hourIndex])
    } // end of for
    return this
  }

  /**
   * Apply changes to the array of lessons
   * @param changes the list of changes as retrieved from the Iscool API
   * @example
   * const timetable = new Timetable(settings).fromIscool(schedule);
   * timetable.applyChanges(changes);
   */
  public applyChanges(changes: IChangeIscool[]) {
    for (let changeObj of changes) {
      const modification = ISCOOL.toModification(changeObj)
      const day = ISCOOL.toDate(changeObj.Date).getDay() as DayOfWeek
      const hour = changeObj.Hour as HourOfDay
      this.applyChange(day, hour, changeObj.StudyGroup, modification)
    }
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

      newChanges.push(ISCOOL.toChange(change))
    }

    return newChanges
  }

  public applyExistingChanges(changes: IChange[]) {
    for (let { day, hour, subject, teacher, ...modification } of changes)
      this.applyChange(day, hour, { subject, teacher }, modification)
  }

  /**
   * Applies a change
   * @param day the day of the change as given
   * @param hour the hour of the change as given
   * @param studyGroup the study group of the change, if given
   * @param modification the modification data
   */
  private applyChange(
    day: DayOfWeek,
    hour: HourOfDay,
    studyGroup: IStudyGroup | IStudyGroupIscool | null,
    modification: IModification
  ): void {
    // compare study groups - is it a relevent change?
    if (!studyGroup) {
      // event detected
      this.lessons[day][hour].events ||= []
      this.lessons[day][hour].events.push(modification.modData as string)
      return
    }

    // collect change study group
    let changeTeacher: string, changeSubject: string
    if (isStudyGroup(studyGroup)) {
      const { subject, teacher } = studyGroup
      changeSubject = subject
      changeTeacher = teacher
    } else {
      // studyGroup is type of IStudyGroupIscool
      const { Subject, Teacher } = studyGroup
      changeSubject = Subject
      changeTeacher = Teacher
    }
    const { teacher, subject } = this.lessons[day][hour]

    if (teacher == changeTeacher && subject == changeSubject) {
      // change belongs to this study group
      this.lessons[day][hour].changes ||= []
      this.lessons[day][hour].changes.push(modification)
    } else if (
      this.settings.showOthersChanges ||
      // checks whether the student studys in the study group which the change belongs (for cases of 'תגבור' etc.)
      (this.settings as IScheduleSettings).studyGroups.filter(
        (studyGroup) => studyGroup[0] === subject && studyGroup[1] === teacher
      ).length > 0
    ) {
      // change belongs to another study group and the user wants to see it
      this.lessons[day][hour].otherChanges ||= []
      this.lessons[day][hour].otherChanges.push({
        ...modification,
        teacher: changeTeacher,
        subject: changeSubject,
      })
    }
  }
}
