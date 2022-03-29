import { StorageContext } from '.'
import { createLogicalWrapper } from '../utils'

export const SchoolExists = createLogicalWrapper(
  StorageContext,
  ({ school }) => !!school && school !== 'null'
)
export const ClassExists = createLogicalWrapper(
  StorageContext,
  ({ classId }) => !!classId && classId !== 'null'
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
