import {
  DAYS_IN_WEEK,
  HOURS_OF_DAY,
  ITeacherLesson,
  ITimetable,
} from '../../interfaces'
import { initMatrix } from '..'
import { IChangeIscool, ILessonArrMemberIscool, ISCOOL } from '@yanshoof/iscool'

/**
 * A Teacher Timetable class capable of reading changes
 * @author Itay Oshri
 * @version 2022.0.0
 */
export class TeacherTimetable
  implements ITimetable<ITeacherLesson, ILessonArrMemberIscool[]>
{
  readonly lessons: ITeacherLesson[][]
  private commonTeacher: string

  constructor(commonTeacher: string) {
    // initialize array
    this.lessons = initMatrix<ITeacherLesson>(DAYS_IN_WEEK, HOURS_OF_DAY)
    this.commonTeacher = commonTeacher
  }

  public fromSchedule(schedule: ILessonArrMemberIscool[]) {
    for (let lesson of schedule) {
      const day = lesson.Day
      const hourIndex = lesson.Hour // 0 hours are possible as well.

      if (this.lessons[day][hourIndex].subject)
        // lesson already defined
        continue

      // find lesson whose teacher is the specified teacher
      const lessonIndex = lesson.Lessons.findIndex(
        (element) => element.Teacher === this.commonTeacher
      )

      if (lessonIndex == -1)
        // no lesson found for this class
        continue

      this.lessons[day][hourIndex] = ISCOOL.toTeacherLesson(
        lesson.Lessons[lessonIndex]
      )
    } // end of for

    return this
  }

  /**
   * Apply changes to the array of lessons
   * @param changes the list of changes as retrieved from the Iscool API
   * @example
   * const timetable = new Timetable(settings).fromSchedule(schedule);
   * timetable.applyChanges(changes);
   */
  public applyChanges(changes: IChangeIscool[]) {
    for (let changeObj of changes) {
      const modification = ISCOOL.toModification(changeObj)
      const day = ISCOOL.toDate(changeObj.Date).getDay()
      const hour = changeObj.Hour

      // compare study groups - is it a relevent change?
      if (!changeObj.StudyGroup)
        // yeah, blame the iScool API
        continue

      const { Teacher: changeTeacher, Subject: changeSubject } =
        changeObj.StudyGroup
      const lesson = this.lessons[day][hour]
      if (
        this.commonTeacher == changeTeacher &&
        lesson.subject == changeSubject
      )
        this.lessons[day][hour] = { ...lesson, ...modification }
    }
  }
}
function HOURS_OF_SCHEDULE<T>(
  DAYS_IN_WEEK: number,
  HOURS_OF_SCHEDULE: any
): ITeacherLesson[][] {
  throw new Error('Function not implemented.')
}
