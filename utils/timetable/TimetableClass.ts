import {
  DayOfWeek,
  HourOfDay,
  IChange,
  IChangeIscool,
  ILesson,
  ILessonArrMemberIscool,
  IScheduleSettings,
  isILessonObj,
  isSettingsObj,
  ITimetable,
} from '../../interfaces'
import { ISCOOL } from '..'
import { initMatrix } from '..'
import { isMatrix } from '../data/arrays'

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
    const { showOthersChanges } = this.settings
    for (let changeObj of changes) {
      const modification = ISCOOL.toModification(changeObj)
      const day = ISCOOL.toDate(changeObj.Date).getDay()
      const hour = changeObj.Hour

      // compare study groups - is it a relevent change?
      const { Teacher: changeTeacher, Subject: changeSubject } =
        changeObj.StudyGroup
      const lesson = this.lessons[day][hour]
      if (lesson.teacher == changeTeacher && lesson.subject == changeSubject)
        this.lessons[day][hour] = { ...lesson, ...modification }
      else if (showOthersChanges) {
        this.lessons[day][hour].otherChanges ||= []
        this.lessons[day][hour].otherChanges.push({
          ...modification,
          teacher: changeTeacher,
          subject: changeSubject,
        })
      }
    }
  }

  public applyExistingChanges(changes: IChange[]) {
    const { showOthersChanges } = this.settings
    for (let {
      day,
      hour,
      subject: changeSubject,
      teacher: changeTeacher,
      ...modification
    } of changes) {
      const lesson = this.lessons[day][hour]
      if (lesson.teacher == changeTeacher && lesson.subject == changeSubject)
        this.lessons[day][hour] = { ...lesson, ...modification }
      else if (showOthersChanges) {
        this.lessons[day][hour].otherChanges ||= []
        this.lessons[day][hour].otherChanges.push({
          ...modification,
          teacher: changeTeacher,
          subject: changeSubject,
        })
      }
    }
  }
}
