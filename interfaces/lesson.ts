import { type } from 'os'
import { DayOfWeek, HourOfDay } from '.'

/**
 * An enum of possible modifications done to a lesson
 */
export enum LessonModification {
  None = 0,
  Canceled, //1
  Exam, //2
  NewTeacher, //3
  NewRoom, //4
  NewHour, //5
  Other,
}

/**
 * A combination of an optionsl modification and optional data
 */
export interface IModification {
  modification?: LessonModification
  modData?: string | number // modification data if needed
}

/**
 * A combination of a teacher and a subject
 */
export interface IStudyGroup {
  subject: string
  teacher: string
}

export function isStudyGroup(obj: unknown): obj is IStudyGroup {
  return typeof obj == 'object' && 'subject' in obj && 'teacher' in obj
}

/**
 * Represents a modification. Determines a study group and the exact modification to it
 * @extends IModification for listing any changes made for the lesson
 * @extends IStudyGroup to specify the teacher and the subject
 */
export interface IStudyGroupWithModification
  extends IStudyGroup,
    IModification {}

/**
 * Represents a lesson.
 * @extends IStudyGroup for listing the study group
 * @field class a string specifying where the lesson will be taking place
 * @field changes is an array of changes made to the hour
 * @field events is an array representing changes that may apply to all class members
 * @field otherChanges an array of other combinations of study groups and modifications done by the time this lesson is taking place.
 */
export interface ILesson extends IStudyGroup {
  class: string // Room string / Zoom / Async
  changes?: IModification[]
  events?: string[]
  otherChanges?: IStudyGroupWithModification[]
}

export type LessonOrMultiple = ILesson[]

export function isILessonObj(obj: unknown): obj is ILesson {
  return (
    typeof obj == 'object' &&
    'subject' in obj &&
    'teacher' in obj &&
    'class' in obj
  )
}

export function isAnyLessonObj(obj: unknown): obj is ILesson {
  return typeof obj == 'object' && 'subject' in obj && 'class' in obj
}

export type ITeacherLesson = Omit<ILesson, 'teacher'>

/**
 * Represents a change in the schedule.
 * @extends IStudyGroupWithModification for listing the study group and possible modifications to it
 * @field day for the day the change will take into effect
 * @field hour for the hour of day the change will take into effect
 */
export interface IChange extends IStudyGroupWithModification {
  day: DayOfWeek
  hour: HourOfDay
}
