import { IScheduleSettings, DayOfWeek, HourOfDay } from '../../interfaces'

export const THEME_OPTIONS = ['system', 'light', 'dark'] as const
export type ThemePreference = typeof THEME_OPTIONS[number]
export const UPDATE_TIME_OPTIONS = [
  16, 17, 18, 19, 20, 21, 22, 23, 24 /* Midnight */,
]
export type UpdateTimePreference = typeof UPDATE_TIME_OPTIONS[number]

export interface IStorageValues {
  school: string
  classId: string
  scheduleSettings: IScheduleSettings
  theme: ThemePreference
  updateTime: UpdateTimePreference
}

export interface IStorage {
  setSchool(newValue?: string): void
  setClassId(newValue?: string): void
  setTheme(newValue?: ThemePreference): void
  setUpdateTime(newValue?: UpdateTimePreference): void
  setOthersChangesPreference(newValue?: boolean): void
  appendScheduleSetting(setting: [DayOfWeek, HourOfDay, string, string]): void
}

export interface IStorageContext extends IStorageValues, IStorage {}
