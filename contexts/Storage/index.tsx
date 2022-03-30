// the context responsible for handling storage

import { createContext } from 'react'
import { Wrapper } from '../../components/types'
import TimetableLoadingScreen from '../../components/ui/LoadingScreens/TimetableLoadingScreen'
import { useClientRender } from '../../hooks/useClientRender'
import { createUseContextHook } from '../utils'
import {
  useClassId,
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

export const StorageContext = createContext<IStorageContext>(
  {} as IStorageContext
)

export const useStorage = createUseContextHook(StorageContext)

export default function StorageProvider({ children }: Wrapper) {
  const [school, setSchool] = useSchoolState()
  const [schoolName, setSchoolName] = useSchoolName()
  const [classId, setClassId] = useClassId()
  const [showOthersChanges, setOthersChangesPreference] = useOthersChanges()
  const [studyGroups, setStudyGroups] = useStudyGroups()
  const [studyGroupMap, setStudyGroupMap] = useStudyGroupMap()
  const [updateTime, setUpdateTime] = useUpdateTimePreference()
  const [theme, setTheme] = useThemePreference()
  const [lastUserUpdate, setLastUserUpdate] = useLastUserUpdate()
  const [teacherSearchHistory, setTeacherSearchHistory] =
    useTeacherSearchHistory()
  const isClient = useClientRender()

  if (!isClient) return <TimetableLoadingScreen />

  return (
    <StorageContext.Provider
      value={{
        school,
        schoolName,
        classId,
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
