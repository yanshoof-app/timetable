import { ILesson, ILessonArrMemberIscool, ITimetable } from '../../interfaces'
import { ITeacherList } from '../../interfaces/teacherList'

/**
 * A class that its objects contains a teacher list
 * @author Itay Oshri
 * @version 2022.0.0
 */
export class TeacherList implements ITeacherList {
  private teacherSet: Set<string>

  constructor() {
    this.teacherSet = new Set()
  }

  public fromIscool(schedule: ILessonArrMemberIscool[]) {
    for (let lesson of schedule) {
      lesson.Lessons.forEach((studyGroup) => {
        if (studyGroup.Teacher !== '') {
          this.teacherSet.add(studyGroup.Teacher)
        }
      })
    }
    return this
  }

  get teachers(): string[] {
    return [...this.teacherSet]
  }

  public static fromSchedule(schedule: ILesson[][]) {
    const teacherSet = new Set()
    for (let day of schedule) {
      for (let lesson of day) {
        if (typeof lesson.teacher !== 'undefined')
          teacherSet.add(lesson.teacher)
      }
    }
    return [...teacherSet].sort() as string[]
  }
}
