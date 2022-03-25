import { createContext, useCallback } from 'react'
import { Wrapper } from '../../components/types'
import { useStorage } from '../Storage'
import { createLogicalWrapper, createUseContextHook } from '../utils'
import { IAppendSetting, ITimetableContext } from './types'
import { useUpdateableTimetable } from './useUpdateableTimetable'

export const TimetableContext = createContext({} as ITimetableContext)

export const NoProblemsInSettings = createLogicalWrapper(
  TimetableContext,
  (ctx) => !ctx.problems || !ctx.problems.length
)

export const useTimetable = createUseContextHook(TimetableContext)

export default function TimetableProvider({ children }: Wrapper) {
  const updateableTimetable = useUpdateableTimetable()
  const { studyGroups, setStudyGroups, setStudyGroupMap } = useStorage()

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
      updateableTimetable.setProblems((prev) =>
        prev.filter(([d, h]) => d != day || h != hour)
      )
    },
    [
      studyGroups,
      setStudyGroups,
      setStudyGroupMap,
      updateableTimetable.setProblems,
    ]
  )

  return (
    <TimetableContext.Provider
      value={{ ...updateableTimetable, appendScheduleSetting }}
    >
      {children}
    </TimetableContext.Provider>
  )
}
