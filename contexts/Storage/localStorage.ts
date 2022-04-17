// a file responsible for all local storage value handlers

import {
  createLocalStorageState,
  ILocalStorageHandler,
} from '../../hooks/useLocalStorageState'
import { ILesson } from '../../interfaces'
import {
  ThemePreference,
  THEME_OPTIONS,
  UpdateTimePreference,
  UPDATE_TIME_OPTIONS,
} from './types'

const defaultHandler: ILocalStorageHandler<string> = {
  decode(str?: string) {
    return str
  },
  toStorable(value: string) {
    return value
  },
}

const numericHandler: ILocalStorageHandler<number> = {
  decode(str?: string) {
    return str ? Number(str) : undefined
  },
  toStorable(value: number) {
    return value.toString()
  },
}

export const useSchoolState = createLocalStorageState('school', defaultHandler)

export const useSchoolName = createLocalStorageState(
  'schoolName',
  defaultHandler
)
export const useClassId = createLocalStorageState('classId', defaultHandler)

/*
export const useUserClassName = createLocalStorageState(
  'userClassName',
  defaultHandler
)
*/

export const useGrade = createLocalStorageState('grade', numericHandler)

export const useClassNum = createLocalStorageState('classNum', numericHandler)

export const useOthersChanges = createLocalStorageState<boolean>(
  'showOthersChanges',
  {
    decode: (str?: string) => !(str === 'false'),
    toStorable: (value: boolean) => (value ? 'true' : 'false'),
  }
)

export const useThemePreference = createLocalStorageState<ThemePreference>(
  'theme',
  {
    decode: (str?: string) =>
      THEME_OPTIONS.includes(str as ThemePreference)
        ? (str as ThemePreference)
        : 'system',
    toStorable: (value: ThemePreference) => value as string,
  }
)

export const useUpdateTimePreference =
  createLocalStorageState<UpdateTimePreference>('updateTime', {
    decode: (str?: string) =>
      UPDATE_TIME_OPTIONS.includes(Number(str)) ? Number(str) : null,
    toStorable: (value: UpdateTimePreference) => value.toString(),
  })

export const useStudyGroups = createLocalStorageState<[string, string][]>(
  'studyGroups',
  {
    decode: (str?: string) => {
      try {
        return (JSON.parse(str) as [string, string][] | null) || []
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
    decode: (str?: string) => {
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

export const useLastUserUpdate = createLocalStorageState<Date>(
  'lastUserUpdate',
  {
    decode: (str?: string) => (str ? new Date(str) : undefined),
    toStorable: (value: Date) => value.toISOString(),
  }
)

export const useTeacherSearchHistory = createLocalStorageState<Set<string>>(
  'teacherSearchHistory',
  {
    decode: (str?: string) => (str ? new Set(JSON.parse(str)) : new Set()),
    toStorable: (value: Set<string>) => JSON.stringify([...value]),
  }
)

export const useClassMatrixState = createLocalStorageState<number[][]>(
  'classMatrix',
  {
    decode: (str?: string) => {
      try {
        return (JSON.parse(str) as number[][] | null) || []
      } catch (e) {
        return []
      }
    },
    toStorable: (value: number[][]) => JSON.stringify(value),
  }
)

export const useGradeState = createLocalStorageState<number[]>('grades', {
  decode: (str?: string) => {
    try {
      return (JSON.parse(str) as number[] | null) || []
    } catch (e) {
      return []
    }
  },
  toStorable: (value: number[]) => JSON.stringify(value),
})

export const useLessonMatrixState = createLocalStorageState<ILesson[][]>(
  'lessons',
  {
    decode: (str?: string) => {
      try {
        return (JSON.parse(str) as ILesson[][] | null) || []
      } catch (e) {
        return []
      }
    },
    toStorable: (value: ILesson[][]) => JSON.stringify(value),
  }
)
