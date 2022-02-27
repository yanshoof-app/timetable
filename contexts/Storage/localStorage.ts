// a file responsible for all local storage value handlers

import {
  createLocalStorageState,
  ILocalStorageHandler,
} from '../../hooks/useLocalStorageState'
import { IStudyGroup } from '../../interfaces'
import {
  ThemePreference,
  THEME_OPTIONS,
  UpdateTimePreference,
  UPDATE_TIME_OPTIONS,
} from './types'

const defaultHandler: ILocalStorageHandler<string> = {
  getValue(str?: string) {
    return str
  },
  toStorable(value: string) {
    return value
  },
}

export const useSchoolState = createLocalStorageState('school', defaultHandler)
export const useClassId = createLocalStorageState('classId', defaultHandler)

export const useOthersChanges = createLocalStorageState<boolean>(
  'showOthersChanges',
  {
    getValue: (str?: string) => !(str === 'false'),
    toStorable: (value: boolean) => (value ? 'true' : 'false'),
  }
)

export const useThemePreference = createLocalStorageState<ThemePreference>(
  'theme',
  {
    getValue: (str?: string) =>
      THEME_OPTIONS.includes(str as ThemePreference)
        ? (str as ThemePreference)
        : 'system',
    toStorable: (value: ThemePreference) => value as string,
  }
)

export const useUpdateTimePreference =
  createLocalStorageState<UpdateTimePreference>('updateTime', {
    getValue: (str?: string) =>
      UPDATE_TIME_OPTIONS.includes(Number(str)) ? Number(str) : 24,
    toStorable: (value: UpdateTimePreference) => value.toString(),
  })

export const useStudyGroups = createLocalStorageState<[string, string][]>(
  'studyGroups',
  {
    getValue: (str?: string) => {
      try {
        return JSON.parse(str) as [string, string][]
      } catch (e) {
        return []
      }
    },
    toStorable: (value: [string, string][]) => JSON.stringify(value),
  }
)

export const useStudyGroupMap = createLocalStorageState<Map<string, number>>(
  'studyGroupMap',
  {
    getValue: (str?: string) => {
      try {
        return new Map(JSON.parse(str))
      } catch (e) {
        return new Map()
      }
    },
    toStorable: (value: Map<string, number>) =>
      JSON.stringify(Array.from(value)),
  }
)
