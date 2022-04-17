import {
  IChangesResponse,
  IScheduleResponse,
  ITeacherLesson,
} from '../../interfaces'
import {
  ITeacherTimetableEvents,
  TeacherTimetable,
} from '../timetable/TeacherTimetableClass'
import { MultiClassQuery } from './MultiClassQuery'
import { ErrorCode } from './types'

/**
 * Handles building the teacher timetable and notifying about errors
 * @author Itay Schechner
 * @version 2022.0.1
 * @example
 * const timetable = new SessionTeacherTimetable(school, teacherName);
 * timetable.on('ready', () => {
 *  console.log('ready');
 * })
 * timetable.beginQuerying();
 */
export class TeacherTimetableQuery extends MultiClassQuery<
  ITeacherLesson[][],
  ITeacherTimetableEvents
> {
  private teacherTimetable: TeacherTimetable

  /**
   * Constructs a new SessionTeacherTimetable object
   * @param school the name of the school
   * @param teacherName the name of the teacher
   * @param givenClassIds the classIds as sent by the client
   * @param givenGrades the grades as sent by the client
   */
  constructor(
    school: string,
    teacherName: string,
    givenClassIds: number[][],
    givenGrades: number[]
  ) {
    super(school, givenClassIds, givenGrades)
    this.teacherTimetable = new TeacherTimetable(teacherName)
    this.teacherTimetable.on('newChange', (...args) =>
      this.emit('newChange', ...args)
    )
    this.teacherTimetable.on('newLesson', (...args) =>
      this.emit('newLesson', ...args)
    )
  }

  private async fetchClassLessons(classId: number) {
    const { Schedule } = await this.fetchUntilResult<IScheduleResponse>(
      'schedule',
      this.school,
      classId
    )
    this.teacherTimetable.fromIscool(Schedule)
  }

  private async fetchChanges(classId: number) {
    const { Changes } = await this.fetchUntilResult<IChangesResponse>(
      'changes',
      this.school,
      classId
    )
    this.teacherTimetable.applyChanges(Changes)
  }

  protected async beginWithClassLookup(): Promise<void> {
    await this.forEachClass(this.fetchClassLessons)
    await this.forEachClass(this.fetchChanges)
    this.emit('ready', this.teacherTimetable.lessons)
  }
}
