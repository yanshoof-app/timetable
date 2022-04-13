// the context responsible for handling storage

import { createContext } from 'react'
import { Wrapper } from '../../components/types'
import TimetableLoadingScreen from '../../components/ui/LoadingScreens/TimetableLoadingScreen'
import { useClientRender } from '../../hooks/useClientRender'
import { createUseContextHook } from '../utils'
import {
  useClassId,
  useClassNum,
  useGrade,
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
  const isClient = useClientRender()

  useClearUnusedStudyGroups({
    studyGroupMap,
    studyGroups,
    setStudyGroupMap,
    setStudyGroups,
  } as IStorageContext)

  if (!isClient) return <TimetableLoadingScreen />

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
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}
