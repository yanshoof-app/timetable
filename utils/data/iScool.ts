import {
  IModification,
  LessonModification,
  ILesson,
  IChangeIscool,
  ILessonIscool,
  ITeacherLesson,
  ISchoolSearchResultIscool,
  ISchoolLookupResult,
  IChange,
  DayOfWeek,
  HourOfDay,
} from '../../interfaces'
import { CLASS_UNAVAILABLE, ONLINE, ONLINE_ASYNCRONOUS } from './strings'

/**
 * A container class to convert Iscool types to our own
 * @authors Itay Schechner, Itay Oshri
 * @version 2022.0.0
 */
export class ISCOOL {
  /**
   * Converts a date to its matching JavaScript Date object.
   * @param date the date string, in the form of "Date(...)"
   * @returns its matching date object
   */
  static toDate(date: string) {
    const milleseconds = date.match(/(\d+)/)[1]
    return new Date(Number(milleseconds))
  }

  /**
   * Returns a string representation of where the lesson will be learnt/
   * @param Te the lesson type, as specified by Iscool - none, online, asyncronous
   * @param Room thr room specified by Iscool
   * @returns a string representing thr (actual) room / Zoom / Async description of the lesson's location
   */
  static toClass(Te: string, Room: string): string {
    return Te == ''
      ? Room
      : Te == ONLINE
      ? ONLINE
      : Te == ONLINE_ASYNCRONOUS
      ? ONLINE_ASYNCRONOUS
      : CLASS_UNAVAILABLE
  }

  /**
   * Represents a representation of the change type and data in a compact way.
   * @param change the change object, as specified by Iscool
   * @returns its matching modification object
   */
  static toModification(change?: IChangeIscool): IModification {
    switch (change.ChangeType) {
      case 'FreeLesson':
        return { modification: LessonModification.Canceled }
      case 'Exam':
        return { modification: LessonModification.Exam }
      case 'NewTeacher':
        return {
          modification: LessonModification.NewTeacher,
          modData: change.NewTeacher,
        }
      case 'NewRoom':
        return {
          modification: LessonModification.NewRoom,
          modData: change.NewRoom,
        }
      case 'NewHour':
        return {
          modification: LessonModification.NewHour,
          modData: change.NewHour,
        }
      default:
        return {
          modification: LessonModification.Other,
          modData: change.FixType,
        }
    }
  }

  /**
   * Returns a representation of an Iscool lesson in an ILesson format.
   * @param lesson the iscool lesson
   * @returns its representation in an ILesson format
   */
  static toLesson({ Subject, Teacher, Te, Room }: ILessonIscool): ILesson {
    return {
      subject: Subject,
      teacher: Teacher,
      class: ISCOOL.toClass(Te, Room),
    }
  }

  /**
   * Returns a representation of an Iscool lesson in an ITeacherLesson format
   * @param param0 the iscool lesson
   * @returns its representation in an ITeacherLesson format
   */
  static toTeacherLesson({ Subject, Te, Room }: ILessonIscool): ITeacherLesson {
    return {
      subject: Subject,
      class: ISCOOL.toClass(Te, Room),
    }
  }

  /**
   * Converts an Iscool search result to a ISchoolLookupResult format
   * @param param0 the search result to convert
   * @returns its representation in the specified format
   */
  static toSchoolLookupResult({
    name,
    semel,
  }: ISchoolSearchResultIscool): ISchoolLookupResult {
    return {
      name,
      symbol: semel,
    }
  }

  /**
   * Converts an Iscool change object to ours
   * @param change the change given by Iscool
   * @returns its matching IChange representation
   */
  static toChange(change: IChangeIscool): IChange {
    const { Subject, Teacher } = change.StudyGroup
    return {
      subject: Subject,
      teacher: Teacher,
      day: this.toDate(change.Date).getDay() as DayOfWeek,
      hour: change.Hour as HourOfDay,
      ...this.toModification(change),
    }
  }
}
