// the context responsible for handling storage

import { Component, createContext, useCallback } from 'react'
import { Wrapper } from '../../components/types'
import { DayOfWeek, HourOfDay } from '../../interfaces'
import { createUseContextHook } from '../utils'
import {
  useClassId,
  useOthersChanges,
  useSchoolState,
  useStudyGroupMap,
  useStudyGroups,
  useThemePreference,
  useUpdateTimePreference,
} from './localStorage'
import { IAppendSetting, IStorageContext } from './types'

export const StorageContext = createContext<IStorageContext>(
  {} as IStorageContext
)

export const useStorage = createUseContextHook(StorageContext)

export default function StorageProvider({ children }: Wrapper) {
  const [school, setSchool] = useSchoolState()
  const [classId, setClassId] = useClassId()
  const [showOthersChanges, setOthersChangesPreference] = useOthersChanges()
  const [studyGroups, setStudyGroups] = useStudyGroups()
  const [studyGroupMap, setStudyGroupMap] = useStudyGroupMap()
  const [updateTime, setUpdateTime] = useUpdateTimePreference()
  const [theme, setTheme] = useThemePreference()

  const appendScheduleSetting = useCallback(
    ({ day, hour, subject, teacher }: IAppendSetting) => {
      let indexOfSg = studyGroups.findIndex(
        ([s, t]) => s === subject && t === teacher
      )
      if (indexOfSg == -1) {
        indexOfSg = studyGroups.length
        setStudyGroups((prev) => [...prev, [subject, teacher]])
      }
      setStudyGroupMap((prev) => new Map(prev.set(`${day},${hour}`, indexOfSg)))
    },
    [studyGroups, setStudyGroups, setStudyGroupMap]
  )
  return (
    <StorageContext.Provider
      value={{
        school,
        classId,
        showOthersChanges,
        studyGroups,
        studyGroupMap,
        updateTime,
        theme,
        setSchool,
        setClassId,
        setOthersChangesPreference,
        setUpdateTime,
        setTheme,
        appendScheduleSetting,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}
