import { TypedEmitter } from 'tiny-typed-emitter'
import {
  IChangesResponse,
  IClassesResponse,
  IScheduleResponse,
  ITeacherLesson,
} from '../../interfaces'
import { HTTPError } from '../../interfaces/errors'
import { ClassLookup } from '../class'
import { fetchDataSource } from '../data/datasource'
import {
  ITeacherTimetableEvents,
  TeacherTimetable,
} from '../timetable/TeacherTimetableClass'
import { MultiClassQuery } from './MultiClassQuery'
import { ErrorCode } from './types'

interface SessionTimetableEvents extends ITeacherTimetableEvents {
  ready: (timetable: ITeacherLesson[][]) => void
  error: (code: ErrorCode) => void
  delay: () => void
}

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
   */
  constructor(school: string, teacherName: string) {
    super(school)
    this.teacherTimetable = new TeacherTimetable(teacherName)
    this.teacherTimetable.on('newChange', (...args) =>
      this.emit('newChange', ...args)
    )
    this.teacherTimetable.on('newLesson', (...args) =>
      this.emit('newLesson', ...args)
    )
  }

  private fetchClassLessons = async (classId: number) => {
    const { Schedule } = await this.fetchUntilResult<IScheduleResponse>(
      'classes',
      this.school,
      classId
    )
    this.teacherTimetable.fromIscool(Schedule)
  }

  private fetchChanges = async (classId: number) => {
    const { Changes } = await this.fetchUntilResult<IChangesResponse>(
      'changes',
      this.school,
      classId
    )
    this.teacherTimetable.applyChanges(Changes)
  }

  protected async beginWithClassLookup(): Promise<void> {
    this.forEachClass(this.fetchClassLessons)
    this.forEachClass(this.fetchChanges)
    this.emit('ready', this.teacherTimetable.lessons)
  }
}
