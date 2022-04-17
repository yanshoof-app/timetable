// the context responsible for handling storage

import { createContext, useCallback, useEffect } from 'react'
import { Wrapper } from '../../components/types'
import AppLoadingScreen from '../../components/ui/LoadingScreens/AppLoadingScreen'
import { useClientRender } from '../../hooks/useClientRender'
import { createUseContextHook } from '../utils'
import {
  useClassId,
  useClassMatrixState,
  useClassNum,
  useGrade,
  useGradeState,
  useLastUserUpdate,
  useOthersChanges,
  useSchoolName,
  useSchoolState,
  useStudyGroupMap,
  useStudyGroups,
  useTeacherSearchHistory,
  useThemePreference,
  useUpdateTimePreference,
} from './localStorage'
import { IStorageContext } from './types'
import { useClearUnusedStudyGroups } from './utils'

export const StorageContext = createContext<IStorageContext>(
  {} as IStorageContext
)

export const useStorage = createUseContextHook(StorageContext)

export default function StorageProvider({ children }: Wrapper) {
  const [school, setSchool] = useSchoolState()
  const [schoolName, setSchoolName] = useSchoolName()
  const [classId, setClassId] = useClassId()
  const [grade, setGrade] = useGrade()
  const [classNum, setClassNum] = useClassNum()
  const [showOthersChanges, setOthersChangesPreference] = useOthersChanges()
  const [studyGroups, setStudyGroups] = useStudyGroups()
  const [studyGroupMap, setStudyGroupMap] = useStudyGroupMap()
  const [updateTime, setUpdateTime] = useUpdateTimePreference()
  const [theme, setTheme] = useThemePreference()
  const [lastUserUpdate, setLastUserUpdate] = useLastUserUpdate()
  const [teacherSearchHistory, setTeacherSearchHistory] =
    useTeacherSearchHistory()
  const [classIds, setClassIds] = useClassMatrixState()
  const [grades, setGrades] = useGradeState()
  const isClient = useClientRender()

  useClearUnusedStudyGroups({
    studyGroupMap,
    studyGroups,
    setStudyGroupMap,
    setStudyGroups,
  } as IStorageContext)

  const resetTimetableSettings = useCallback(() => {
    setStudyGroupMap(new Map())
    setStudyGroups([])
    setLastUserUpdate(undefined)
  }, [setLastUserUpdate, setStudyGroupMap, setStudyGroups])

  const resetClassSettings = useCallback(() => {
    setGrades([])
    setClassIds([])
    setGrade(undefined)
    setClassNum(undefined)
    setClassId(undefined)
    setLastUserUpdate(undefined)
  }, [
    setClassId,
    setClassIds,
    setClassNum,
    setGrade,
    setGrades,
    setLastUserUpdate,
  ])

  if (!isClient) return <AppLoadingScreen />

  return (
    <StorageContext.Provider
      value={{
        school,
        schoolName,
        classId,
        grade,
        classNum,
        showOthersChanges,
        studyGroups,
        studyGroupMap,
        updateTime,
        teacherSearchHistory,
        theme,
        lastUserUpdate,
        classIds,
        grades,
        setSchool,
        setSchoolName,
        setClassId,
        setGrade,
        setClassNum,
        setOthersChangesPreference,
        setUpdateTime,
        setTheme,
        setStudyGroups,
        setStudyGroupMap,
        setLastUserUpdate,
        setTeacherSearchHistory,
        setClassIds,
        setGrades,
        resetTimetableSettings,
        resetClassSettings,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}
