import { TypedEmitter } from 'tiny-typed-emitter'
import {
  IChangesResponse,
  IClassesResponse,
  IScheduleResponse,
  ITeacherLesson,
} from '../../interfaces'
import { ClassLookup } from '../class'
import { fetchDataSource } from '../data/datasource'
import {
  ITeacherTimetableEvents,
  TeacherTimetable,
} from '../timetable/TeacherTimetableClass'
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
export class SessionTeacherTimetable extends TypedEmitter<SessionTimetableEvents> {
  private teacherTimetable: TeacherTimetable
  private school: string
  private classLookup: ClassLookup

  /**
   * Constructs a new SessionTeacherTimetable object
   * @param school the name of the school
   * @param teacherName the name of the teacher
   */
  constructor(school: string, teacherName: string) {
    super()
    this.teacherTimetable = new TeacherTimetable(teacherName)
    this.school = school
    this.classLookup = null // cannot be defined syncronously
    this.teacherTimetable.on('newChange', (...args) =>
      this.emit('newChange', ...args)
    )
    this.teacherTimetable.on('newLesson', (...args) =>
      this.emit('newLesson', ...args)
    )
  }

  private async queryClasses() {
    try {
      const { Classes } = await fetchDataSource<IClassesResponse>(
        'classes',
        this.school,
        0
      )
      this.classLookup = new ClassLookup(Classes)
    } catch (err) {
      this.emit('error', ErrorCode.ERROR_FETCHING_CLASSES)
    }
  }

  /**
   * Begin querying the teacher's timetable.
   * Notify when there is an error, when done and when experiencing a delay.
   */
  async beginQuerying() {
    await this.queryClasses()
    let scheduleResponse: IScheduleResponse
    for (let grade of this.classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue
        scheduleResponse = await fetchDataSource<IScheduleResponse>(
          'schedule',
          this.school,
          classId
        )
        this.teacherTimetable.fromIscool(scheduleResponse.Schedule)
      }
    }
    let changesResponse: IChangesResponse
    for (let grade of this.classLookup.classIds) {
      for (let classId of grade) {
        if (classId == ClassLookup.CLASS_NOT_FOUND) continue
        changesResponse = await fetchDataSource<IChangesResponse>(
          'changes',
          this.school,
          classId
        )
        this.teacherTimetable.applyChanges(changesResponse.Changes)
      }
    }
  }
}
