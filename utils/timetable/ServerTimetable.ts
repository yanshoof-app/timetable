import {
  IChangeIscool,
  ILessonArrMemberIscool,
  ILessonIscool,
  ISCOOL,
  IscoolDate,
} from '@yanshoof/iscool'
import { Settings } from '@yanshoof/settings'
import {
  DayOfWeek,
  HourOfDay,
  IChange,
  ILesson,
  IStudyGroup,
  ITimetable,
} from '@yanshoof/types'
import { endOfWeek } from '../data/updates'
import { ChangeableTimetable } from './ChangeableTimetable'

/**
 * A Timetable class capable of reading settings and changes
 * @author Itay Schechner
 * @version 2022.0.0
 */
export class ServerTimetable
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

      const selectedLesson = this.settings.selectLesson(
        day,
        hour,
        hourlyLessons
      )
      if (selectedLesson)
        this.lessons[day][hour] = ISCOOL.toLesson(selectedLesson)
    } // end of for
    return this
  }

  /**
   * Apply changes from iscool
   * @param changes the changes as sent by iscool
   */
  public applyChanges(changes: IChangeIscool[]) {
    for (let change of changes) {
      const day = new IscoolDate(change.Date).day
      const hour = change.Hour
      const studyGroup = ISCOOL.toStudyGroup(change.StudyGroup)
      const modification = ISCOOL.toModification(change)
      this.applyChange(day, hour, studyGroup, modification)
    }
  }

  protected shouldShowOthersChanges(
    day: DayOfWeek,
    hour: HourOfDay,
    studyGroup: IStudyGroup
  ) {
    /** Omitted: do not allow  */
    return this.settings.showOthersChanges
  }

  /**
   * The problems in the settings of the timetable
   */
  get problems() {
    return this.settings.problems
  }

  /**
   * Select changes updates since the last user update
   * @param lastUserUpdate the last time the user updated it's schedule
   * @param changes the changes as given from ISCOOL
   * @returns new changes
   */
  public selectNewChanges(lastUserUpdate: Date, changes: IChangeIscool[]) {
    const newChanges: IChange[] = [],
      newOthersChanges: IChange[] = [],
      newEvents: IChange[] = []
    IscoolDate.relevantDatesOnly(changes, lastUserUpdate, endOfWeek())
      .map((change) => ISCOOL.toChange(change as IChangeIscool))
      .forEach((change) => {
        if (!change.subject || !change.teacher)
          // event detected
          newEvents.push(change)
        else {
          // change detected - check if own study group
          if (
            // @ts-ignore
            !this.settings.hasSetting(change.day, change.hour) ||
            this.settings.isOwnStudyGroup(change.day, change.hour, change)
          )
            // own change
            newChanges.push(change)
          else if (this.settings.showOthersChanges)
            newOthersChanges.push(change)
        }
      })
    return { newChanges, newEvents, newOthersChanges }
  }
}
