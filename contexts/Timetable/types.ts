import { DayOfWeek, HourOfDay } from '../../interfaces'
import { IUpdateableTimetable } from './useUpdateableTimetable'

export interface IAppendSetting {
  day: DayOfWeek
  hour: HourOfDay
  subject: string
  teacher: string
}

export interface ITimetableContext extends IUpdateableTimetable {
  appendScheduleSetting(setting: IAppendSetting): void
}
