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
export const TimetableIsSaved = createLogicalWrapper(
  StorageContext,
  (ctx) => !!ctx.lessons.length
)
export const UpdateTimeExists = createLogicalWrapper(
  StorageContext,
  ({ updateTime }) => !!updateTime
)
