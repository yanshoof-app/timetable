import { createLogicalWrapper } from '../utils'
import { createContext } from 'react' //temp
import { IStorageContext } from './types' //temp

const StorageContext = createContext<IStorageContext>({} as IStorageContext) //temp

export const SchoolExists = createLogicalWrapper(
  StorageContext,
  ({ school }) => !!school
)
export const ClassExists = createLogicalWrapper(
  StorageContext,
  ({ classId }) => !!classId
)
export const ThemePreferenceExists = createLogicalWrapper(
  StorageContext,
  ({ theme }) => !!theme
)
export const UpdateTimeExists = createLogicalWrapper(
  StorageContext,
  ({ updateTime }) => !!updateTime
)
export const OthersChangesPreferenceExists = createLogicalWrapper(
  StorageContext,
  ({ showOthersChanges }) => showOthersChanges != undefined
)
