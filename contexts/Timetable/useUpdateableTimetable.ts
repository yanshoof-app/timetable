import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
  applyLesson(day: DayOfWeek, hour: HourOfDay[], lesson: ILesson): unknown
}

export function useUpdateableTimetable(): IUpdateableTimetable {
  const [lessonMatrix, setLessonMatrix] = useLessonMatrixState()
  const [problems, setProblems] = useState<[DayOfWeek, HourOfDay][]>([])
  const needsRefreshRef = useRef(false)
  const { studyGroups, studyGroupMap, showOthersChanges } = useStorage()
  const updates = useUpdates()

  // update timetable immedietly if overriden by server
  useEffect(() => {
    const { overrideTimetable, problems } = updates.data
    if (overrideTimetable) setLessonMatrix(overrideTimetable)
    setProblems(problems)
    if (problems && problems.length > 0) needsRefreshRef.current = true
  }, [setLessonMatrix, updates.data])

  // refetch timetable once problems are eliminated
  useEffect(() => {
    if (needsRefreshRef.current && problems && !problems.length) {
      needsRefreshRef.current = false
      updates.fetchUpdates()
    }
  }, [problems, updates.fetchUpdates])

  // use in toast
  const applyUpdates = useCallback(() => {
    const { newChanges } = updates.data
    if (lessonMatrix.length && !updates.isLoading) {
      const timetable = new Timetable(lessonMatrix, {
        studyGroups: studyGroups,
        studyGroupMap: studyGroupMap,
        showOthersChanges: showOthersChanges,
      })
      if (newChanges) timetable.applyExistingChanges([...newChanges])
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
    (day: DayOfWeek, hour: HourOfDay[], lesson: ILesson) => {
      setLessonMatrix((prev) => {
        let lessons = [...prev]
        for (let h of hour) lessons[day][h] = lesson
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
