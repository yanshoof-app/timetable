import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { DayOfWeek, HourOfDay, ILesson } from '../../interfaces'
import { Timetable } from '../../utils'
import { useStorage } from '../Storage'
import { useLessonMatrixState } from './localStorageState'
import useUpdates from './useUpdates'

export interface IUpdateableTimetable {
  lessons: ILesson[][]
  applyUpdates(): unknown
  errorInFetch: boolean
  loadingUpdates: boolean
  changesPending: boolean
  problems: [DayOfWeek, HourOfDay][]
  setProblems: Dispatch<SetStateAction<[DayOfWeek, HourOfDay][]>>
  refetchUpdates(): unknown
  applyLesson(day: DayOfWeek, hour: HourOfDay, lesson: ILesson): unknown
}

export function useUpdateableTimetable(): IUpdateableTimetable {
  const [lessonMatrix, setLessonMatrix] = useLessonMatrixState()
  const [problems, setProblems] = useState<[DayOfWeek, HourOfDay][]>([])
  const { showOthersChanges } = useStorage()
  const updates = useUpdates()

  // update timetable immedietly if overriden by server
  useEffect(() => {
    const { overrideTimetable, problems } = updates.data
    if (overrideTimetable) setLessonMatrix(overrideTimetable)
    setProblems(problems)
  }, [setLessonMatrix, updates.data])

  // use in toast
  const applyUpdates = useCallback(() => {
    const { newChanges, newEvents } = updates.data
    if (lessonMatrix.length && !updates.isLoading) {
      const timetable = new Timetable(lessonMatrix, showOthersChanges)
      if (newChanges)
        timetable.applyExistingChanges([...newChanges, ...newEvents])
      setLessonMatrix(timetable.lessons)
    }
  }, [updates, lessonMatrix, showOthersChanges])

  const refetchUpdates = useCallback(() => {
    setProblems([])
    updates.fetchUpdates()
  }, [updates.fetchUpdates])

  // determine if toast needs to be shown
  const changesPending = useMemo(
    () =>
      updates.data.newChanges &&
      updates.data.newChanges.length &&
      !updates.isLoading,
    [updates]
  )

  const applyLesson = useCallback(
    (day: DayOfWeek, hour: HourOfDay, lesson: ILesson) => {
      setLessonMatrix((prev) => {
        let lessons = [...prev]
        lessons[day][hour] = lesson
        return lessons
      })
    },
    [setLessonMatrix]
  )

  return {
    changesPending,
    applyUpdates,
    problems,
    setProblems,
    refetchUpdates,
    applyLesson,
    lessons: lessonMatrix,
    errorInFetch: updates.error,
    loadingUpdates: updates.isLoading,
  }
}
