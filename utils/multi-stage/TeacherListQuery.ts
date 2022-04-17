import { IScheduleResponse } from '../../interfaces'
import { ITeacherListEvents, TeacherList } from '../teacherList/TeacherList'
import { MultiClassQuery } from './MultiClassQuery'

export class TeacherListQuery extends MultiClassQuery<
  string[],
  ITeacherListEvents
> {
  private teacherList: TeacherList

  /**
   * Constructs a new TeacherListQuery object
   * @param school the school whose teachers are queried
   * @param givenClassIds the classId matrix as given by the client
   * @param givenGrades the grade array as given by the clients
   */
  constructor(
    school: string,
    givenClassIds: number[][],
    givenGrades: number[]
  ) {
    super(school, givenClassIds, givenGrades)
    this.teacherList = new TeacherList()
    this.teacherList.on('teacherAdded', (name) => {
      this.emit('teacherAdded', name)
    })
  }

  private async queryTeachersOfClass(classId: number) {
    const { Schedule } = await this.fetchUntilResult<IScheduleResponse>(
      'schedule',
      this.school,
      classId
    )
    this.teacherList.fromIscool(Schedule)
  }

  protected async beginWithClassLookup() {
    await this.forEachClass(this.queryTeachersOfClass)
    this.emit('ready', this.teacherList.teachers)
  }
}
