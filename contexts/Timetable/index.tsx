import { createContext, useCallback, useEffect } from 'react'
import { Wrapper } from '../../components/types'
import { DayOfWeek, HourOfDay, ILesson } from '../../interfaces'
import { useStorage } from '../Storage'
import { createLogicalWrapper, createUseContextHook } from '../utils'
import { IAppendSetting, ITimetableContext } from './types'
import { useUpdateableTimetable } from './useUpdateableTimetable'
import { useRemoveProblem } from './utils'

export const TimetableContext = createContext({} as ITimetableContext)

export const NoProblemsInSettings = createLogicalWrapper(
  TimetableContext,
  (ctx) => !ctx.problems || !ctx.problems.length
)

export const TimetableIsSaved = createLogicalWrapper(
  TimetableContext,
  (ctx) => !!ctx.lessons.length
)

export const useTimetable = createUseContextHook(TimetableContext)

export default function TimetableProvider({ children }: Wrapper) {
  const updateableTimetable = useUpdateableTimetable()
  const { studyGroups, studyGroupMap, setStudyGroups, setStudyGroupMap } =
    useStorage()

  const removeProblem = useRemoveProblem(updateableTimetable)

  const applyLesson = useCallback(
    (
      day: DayOfWeek,
      hour: HourOfDay,
      lesson: ILesson,
      isEditing: boolean,
      indexOfSg: number
    ) => {
      setStudyGroupMap((prev) => new Map(prev.set(`${day},${hour}`, indexOfSg)))
      if (!isEditing) removeProblem(day, hour)
      updateableTimetable.applyLesson(day, hour, lesson)
    },
    [setStudyGroupMap, removeProblem, updateableTimetable.applyLesson]
  )

  const appendScheduleSetting = useCallback(
    ({ day, hour, lesson }: IAppendSetting, isEditing = false) => {
      if (!lesson.subject && !lesson.teacher) {
        // window
        applyLesson(day, hour, {} as ILesson, isEditing, -1)
        return
      }
      let indexOfSg = studyGroups.findIndex(
        ([s, t]) => s === lesson.subject && t === lesson.teacher
      )
      if (indexOfSg == -1) {
        indexOfSg = studyGroups.length
        setStudyGroups((prev) => [...prev, [lesson.subject, lesson.teacher]])
      }
      applyLesson(day, hour, lesson, isEditing, indexOfSg)
    },
    [applyLesson, studyGroups, setStudyGroups]
  )

  const removeScheduleSetting = useCallback(
    ({ day, hour, lesson }: IAppendSetting) => {
      setStudyGroupMap((prev) => {
        prev.delete(`${day},${hour}`)
        return prev
      })
      updateableTimetable.applyLesson(day, hour, lesson)
    },
    [studyGroupMap]
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
        removeScheduleSetting,
        clearProblems,
      }}
    >
      {children}
    </TimetableContext.Provider>
  )
}
