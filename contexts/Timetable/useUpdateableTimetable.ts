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
  changesPending: boolean
  problems: [DayOfWeek, HourOfDay][]
  setProblems: Dispatch<SetStateAction<[DayOfWeek, HourOfDay][]>>
  refetchUpdates(): unknown
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
  }, [updates, setLessonMatrix, updates.data])

  // use in toast
  const applyUpdates = useCallback(() => {
    const { newChanges } = updates.data
    if (lessonMatrix.length && !updates.isLoading) {
      const timetable = new Timetable(lessonMatrix, showOthersChanges)

      if (newChanges) timetable.applyExistingChanges(newChanges)
      setLessonMatrix(timetable.lessons)
    }
  }, [updates, lessonMatrix, showOthersChanges])

  const refetchUpdates = useCallback(() => {
    setProblems([])
    updates.fetchUpdates()
  }, [updates.fetchUpdates])

  // determine if toast needs to be shown
  const changesPending = useMemo(
    () => updates.data.newChanges && !updates.isLoading,
    [updates]
  )

  const errorInFetch = useMemo(() => !!updates.error, [updates])

  return {
    changesPending,
    applyUpdates,
    errorInFetch,
    problems,
    setProblems,
    refetchUpdates,
    lessons: lessonMatrix,
  }
}
