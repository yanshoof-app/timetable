import { createContext, useCallback, useEffect } from 'react'
import { Wrapper } from '../../components/types'
import useValueChangeCallback from '../../hooks/useValueChangeCallback'
import { DayOfWeek, HourOfDay, ILesson } from '../../interfaces'
import { useStorage } from '../Storage'
import { createLogicalWrapper, createUseContextHook } from '../utils'
import { IAppendSetting, ITimetableContext } from './types'
import { useUpdateableTimetable } from './useUpdateableTimetable'
import { useApplyLessons, useRemoveProblems } from './utils'

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
  const { studyGroups, setStudyGroups, setStudyGroupMap, setLastUserUpdate } =
    useStorage()
  const removeProblems = useRemoveProblems(updateableTimetable)
  const applyLessons = useApplyLessons(
    removeProblems,
    updateableTimetable,
    setStudyGroupMap,
    setLastUserUpdate
  )

  const appendScheduleSetting = useCallback(
    ({ day, hour, lesson }: IAppendSetting, isEditing = false) => {
      if (!lesson.subject && !lesson.teacher) {
        // window
        applyLessons(day, hour, {} as ILesson, isEditing, -1)
        return
      }
      let indexOfSg = studyGroups.findIndex(
        ([s, t]) => s === lesson.subject && t === lesson.teacher
      )
      if (indexOfSg == -1) {
        indexOfSg = studyGroups.length
        setStudyGroups((prev) => [...prev, [lesson.subject, lesson.teacher]])
      }
      applyLessons(day, hour, lesson, isEditing, indexOfSg)
    },
    [applyLessons, studyGroups, setStudyGroups]
  )

  const removeScheduleSetting = useCallback(
    ({ day, hour, lesson }: IAppendSetting) => {
      setStudyGroupMap((prev) => {
        prev.delete(`${day},${hour}`)
        return prev
      })
      updateableTimetable.applyLesson(day, hour, lesson)
    },
    [setStudyGroupMap, updateableTimetable]
  )

  const clearProblems = useCallback(() => {
    for (let [day, hour] of updateableTimetable.problems) {
      appendScheduleSetting({ day: day, hour: [hour], lesson: {} as ILesson })
    }
    updateableTimetable.setProblems([])
  }, [updateableTimetable, appendScheduleSetting])

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
