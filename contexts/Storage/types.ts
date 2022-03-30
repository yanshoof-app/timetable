import { Dispatch, SetStateAction } from 'react'
import { IScheduleSettings, DayOfWeek, HourOfDay } from '../../interfaces'

export const THEME_OPTIONS = ['system', 'light', 'dark'] as const
export type ThemePreference = typeof THEME_OPTIONS[number]
export const UPDATE_TIME_OPTIONS = [
  16, 17, 18, 19, 20, 21, 22, 23, 24 /* Midnight */,
]
export type UpdateTimePreference = typeof UPDATE_TIME_OPTIONS[number]

export interface IStorageValues extends IScheduleSettings {
  school: string
  schoolName: string
  classId: string
  theme: ThemePreference
  updateTime: UpdateTimePreference
  teacherSearchHistory: Set<string>
  lastUserUpdate: Date
}

export interface IStorage {
  setSchool(newValue?: string): void
  setSchoolName(newValue?: string): void
  setClassId(newValue?: string): void
  setTheme(newValue?: ThemePreference): void
  setUpdateTime(newValue?: UpdateTimePreference): void
  setOthersChangesPreference(newValue?: boolean): void
  setTeacherSearchHistory: Dispatch<SetStateAction<Set<string>>>
  setStudyGroups: Dispatch<SetStateAction<[string, string][]>>
  setStudyGroupMap: Dispatch<SetStateAction<Map<string, number>>>
  setLastUserUpdate: Dispatch<SetStateAction<Date>>
}

export interface IStorageContext extends IStorageValues, IStorage {}
