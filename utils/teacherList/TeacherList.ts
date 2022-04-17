import { TypedEmitter } from 'tiny-typed-emitter'
import { ILesson, ILessonArrMemberIscool, ITimetable } from '../../interfaces'
import { ITeacherList } from '../../interfaces/teacherList'

/**
 * Represents events of the TeacherList object
 */
export interface ITeacherListEvents {
  teacherAdded: (teacherName: string) => void
}

/**
 * A class that its objects contains a teacher list
 * @extends TypedEmitter<ITeacherList> to subscribe to teacher addition events
 * @authors Itay Oshri, Itay Schechner
 * @version 2022.0.1
 */
export class TeacherList
  extends TypedEmitter<ITeacherListEvents>
  implements ITeacherList
{
  private teacherSet: Set<string>

  constructor() {
    super()
    this.teacherSet = new Set()
  }

  public fromIscool(schedule: ILessonArrMemberIscool[]) {
    for (let lesson of schedule) {
      lesson.Lessons.forEach(({ Teacher }) => {
        if (Teacher !== '') {
          if (!this.teacherSet.has(Teacher)) {
            this.emit('teacherAdded', Teacher)
            this.teacherSet.add(Teacher)
          }
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
