import { createContext } from 'react'
import { Wrapper } from '../../components/types'
import { createLogicalWrapper, createUseContextHook } from '../utils'
import { IUpdatesContext } from './types'
import { useRefreshableTimetable } from './useRefreshableTimetable'

export const UpdatesContext = createContext({} as IUpdatesContext)

export const NoProblemsInSettings = createLogicalWrapper(
  UpdatesContext,
  (ctx) => !ctx.problems || !ctx.problems.length
)

export const useUpdates = createUseContextHook(UpdatesContext)

export default function UpdatesProvider({ children }: Wrapper) {
  /*
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

  */
  const refreshableTimetable = useRefreshableTimetable()

  return (
    <UpdatesContext.Provider value={{ ...refreshableTimetable }}>
      {children}
    </UpdatesContext.Provider>
  )
}
