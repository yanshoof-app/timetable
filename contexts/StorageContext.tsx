// the context responsible for handling storage

import { createContext } from 'react'
import { DayOfWeek, HourOfDay, IScheduleSettings } from '../interfaces'
import { createUseContextHook } from './utils'

// TYPES

export const THEME_OPTIONS = ['system', 'light', 'dark'] as const
export type ThemePreference = typeof THEME_OPTIONS[number]
export const UPDATE_TIME_OPTIONS = [
  16, 17, 18, 19, 20, 21, 22, 23, 24 /* Midnight */,
]
export type UpdateTimePreference = typeof UPDATE_TIME_OPTIONS[number]

interface IStorageValues {
  school: string
  classId: string
  scheduleSettings: IScheduleSettings
  theme: ThemePreference
  updateTime: UpdateTimePreference
}

interface IStorageContext extends IStorageValues {
  setSchool(newValue?: string): void
  setClassId(newValue?: string): void
  setTheme(newValue?: ThemePreference): void
  setUpdateTime(newValue?: UpdateTimePreference): void
  appendScheduleSetting(setting: [DayOfWeek, HourOfDay, string, string]): void
}

// CONSTANTS

const StorageContext = createContext<IStorageValues>({} as IStorageValues)

export const useStorage = createUseContextHook(StorageContext)
