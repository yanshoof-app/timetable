// the context responsible for handling storage

import { createContext } from 'react'
import { Wrapper } from '../../components/types'
import LoadingScreen from '../../components/ui/LoadingScreen'
import { useClientRender } from '../../hooks/useClientRender'
import { createUseContextHook } from '../utils'
import {
  useClassId,
  useLastUserUpdate,
  useOthersChanges,
  useSchoolState,
  useStudyGroupMap,
  useStudyGroups,
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
  const [classId, setClassId] = useClassId()
  const [showOthersChanges, setOthersChangesPreference] = useOthersChanges()
  const [studyGroups, setStudyGroups] = useStudyGroups()
  const [studyGroupMap, setStudyGroupMap] = useStudyGroupMap()
  const [updateTime, setUpdateTime] = useUpdateTimePreference()
  const [theme, setTheme] = useThemePreference()
  const [lastUserUpdate, setLastUserUpdate] = useLastUserUpdate()
  const isClient = useClientRender()

  if (!isClient) return <LoadingScreen />

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
        lastUserUpdate,
        setSchool,
        setClassId,
        setOthersChangesPreference,
        setUpdateTime,
        setTheme,
        setStudyGroups,
        setStudyGroupMap,
        setLastUserUpdate,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}
