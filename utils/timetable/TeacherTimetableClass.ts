import {
  DayOfWeek,
  HourOfDay,
  IChangeIscool,
  ILessonArrMemberIscool,
  IModification,
  ITeacherLesson,
  ITimetable,
} from '../../interfaces'
import { ISCOOL, Timetable } from '..'
import { initMatrix } from '..'
import { TypedEmitter } from 'tiny-typed-emitter'

export interface ITeacherTimetableEvents {
  newLesson: (day: DayOfWeek, hour: HourOfDay, lesson: ITeacherLesson) => void
  newChange: (
    day: DayOfWeek,
    hour: HourOfDay,
    modification: IModification
  ) => void
}

/**
 * A Teacher Timetable class capable of reading changes
 * @authors Itay Oshri, Itay Schechner
 * @version 2022.0.1
 * @example
 * const teacherTimetable = new TeacherTimetable(teacher);
 * teacherTimetable.on('newLesson', () => {});
 */
export class TeacherTimetable
  extends TypedEmitter<ITeacherTimetableEvents>
  implements ITimetable<ITeacherLesson>
{
  readonly lessons: ITeacherLesson[][]
  private commonTeacher: string

  constructor(commonTeacher: string) {
    super()
    // initialize array
    this.lessons = initMatrix<ITeacherLesson>(
      Timetable.DAYS_IN_WEEK,
      Timetable.HOURS_OF_SCHEDULE
    )
    this.commonTeacher = commonTeacher
  }

  public fromIscool(schedule: ILessonArrMemberIscool[]) {
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
      this.emit('newLesson', day, hourIndex, this.lessons[day][hourIndex])
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
      this.emit('newChange', day, hour, modification)
    }
  }
}
