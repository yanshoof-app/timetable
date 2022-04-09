import { DayOfWeek, HourOfDay, ILesson } from '../../interfaces'
import { IUpdateableTimetable } from './useUpdateableTimetable'

export interface IAppendSetting {
  day: DayOfWeek
  hour: HourOfDay
  lesson: ILesson
}

export interface ITimetableContext extends IUpdateableTimetable {
  appendScheduleSetting(setting: IAppendSetting, isEditing?: boolean): void
  removeScheduleSetting(setting: IAppendSetting): void
  clearProblems(): void
}
