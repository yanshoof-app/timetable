import { createContext, useCallback, useEffect } from 'react'
import { Wrapper } from '../../components/types'
import { DayOfWeek, HourOfDay, ILesson } from '../../interfaces'
import { useStorage } from '../Storage'
import { useLastUserUpdate } from '../Storage/localStorage'
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
  const { studyGroups, studyGroupMap, setStudyGroups, setStudyGroupMap } =
    useStorage()

  const removeProblem = useCallback(
    (day: DayOfWeek, hour: HourOfDay) => {
      updateableTimetable.setProblems((prev) =>
        prev.filter(([d, h]) => d != day || h != hour)
      )
    },
    [updateableTimetable.setProblems]
  )

  const clearUnusedStudyGroups = useCallback(() => {
    const studyGroupMapValues = [...studyGroupMap.values()]
    for (let i = 0; i < studyGroups.length; i++) {
      //detect unused study group
      if (studyGroupMapValues.includes(i)) continue

      //remove the unused study group
      setStudyGroups((prev) => {
        prev.splice(i, 1)
        return prev
      })

      //updates indexes in studyGroupMap
      studyGroupMap.forEach((value, key) => {
        if (value > i) studyGroupMap.set(key, value - 1)
        setStudyGroupMap(studyGroupMap)
      })
    }
  }, [studyGroups, studyGroupMap, setStudyGroups, setStudyGroupMap])

  const appendScheduleSetting = useCallback(
    ({ day, hour, lesson }: IAppendSetting, isEditing = false) => {
      if (!lesson.subject && !lesson.teacher) {
        // window
        setStudyGroupMap((prev) => new Map(prev.set(`${day},${hour}`, -1)))
        if (!isEditing) removeProblem(day, hour)
        updateableTimetable.applyLesson(day, hour, {} as ILesson)
        return
      }
      let indexOfSg = studyGroups.findIndex(
        ([s, t]) => s === lesson.subject && t === lesson.teacher
      )
      if (indexOfSg == -1) {
        indexOfSg = studyGroups.length
        setStudyGroups((prev) => [...prev, [lesson.subject, lesson.teacher]])
      }
      setStudyGroupMap((prev) => new Map(prev.set(`${day},${hour}`, indexOfSg)))
      if (!isEditing) removeProblem(day, hour)
      updateableTimetable.applyLesson(day, hour, lesson)
    },
    [
      studyGroups,
      setStudyGroups,
      setStudyGroupMap,
      removeProblem,
      updateableTimetable.applyLesson,
    ]
  )

  const clearProblems = useCallback(() => {
    for (let [day, hour] of updateableTimetable.problems) {
      appendScheduleSetting({ day: day, hour: hour, lesson: {} as ILesson })
    }
    updateableTimetable.setProblems([])
  }, [
    appendScheduleSetting,
    updateableTimetable.setProblems,
    updateableTimetable.problems,
  ])

  return (
    <TimetableContext.Provider
      value={{
        ...updateableTimetable,
        appendScheduleSetting,
        clearProblems,
      }}
    >
      {children}
    </TimetableContext.Provider>
  )
}
