import { createContext } from 'react'
import { Wrapper } from '../../components/types'
import { createLogicalWrapper } from '../utils'
import {
  IUpdateableTimetable,
  useUpdateableTimetable,
} from './useUpdateableTimetable'

export const TimetableContext = createContext({} as IUpdateableTimetable)

export const NoProblemsInSettings = createLogicalWrapper(
  TimetableContext,
  (ctx) => !ctx.problems || !ctx.problems.length
)

export default function TimetableProvider({ children }: Wrapper) {
  const updateableTimetable = useUpdateableTimetable()
  return (
    <TimetableContext.Provider value={updateableTimetable}>
      {children}
    </TimetableContext.Provider>
  )
}
