import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useHTTP } from '../../hooks/useHTTP'
import { DayOfWeek, HourOfDay, ITimetableUpdates } from '../../interfaces'
import { QueryParams, QueryParamsSettings, Timetable } from '../../utils'
import { useStorage } from '../Storage'

const UPDATES_ROUTE = '/api/timetable/updates'

export type UpdatesQParams = QueryParams & {
  school: string
  classId: string
  // lastUserUpdate: string
}

export interface IRefreshableTimetable {
  applyUpdates(): unknown
  errorInFetch: boolean
  loadingUpdates: boolean
  changesPending: boolean
  otherChangesPending: boolean
  problems: [DayOfWeek, HourOfDay][]
  setProblems: Dispatch<SetStateAction<[DayOfWeek, HourOfDay][]>>
  refetchUpdatesOnError(): unknown
}

/**
 * Warning: do NOT use in components.
 * This is a utility hook for the Timetable context
 */
export function useRefreshableTimetable(): IRefreshableTimetable {
  const fetched = useRef(false)
  const needsRefresh = useRef(false)
  const {
    doFetch,
    data,
    error,
    isLoading: isFetchLoading,
  } = useHTTP<UpdatesQParams, ITimetableUpdates>({
    path: UPDATES_ROUTE,
    fetchOnMount: false,
  })
  const {
    showOthersChanges,
    studyGroupMap,
    studyGroups,
    school,
    classId,
    lastUserUpdate,
    setLastUserUpdate,
    lessons,
    setLessonMatrix,
  } = useStorage()
  const [problems, setProblems] = useState<[DayOfWeek, HourOfDay][]>([])

  const fetchUpdates = useCallback(() => {
    let settings = QueryParamsSettings.toQueryParams({
      showOthersChanges,
      studyGroupMap,
      studyGroups,
      school,
      classId,
    })
    if (lastUserUpdate)
      settings['lastUserUpdate'] = lastUserUpdate.toISOString()
    return doFetch(settings)
  }, [
    classId,
    doFetch,
    lastUserUpdate,
    school,
    showOthersChanges,
    studyGroupMap,
    studyGroups,
  ])

  const handleUpdates = useCallback(
    ({ overrideTimetable, problems }) => {
      setProblems(problems)
      if (overrideTimetable) setLessonMatrix(overrideTimetable)
      if (problems && problems.length > 0) needsRefresh.current = true
      setLastUserUpdate(new Date())
    },
    [setLessonMatrix, setLastUserUpdate]
  )

  // fetch updates when needed
  useEffect(() => {
    if (!fetched.current) {
      fetchUpdates().then(handleUpdates)
      fetched.current = true
    }
  }, [fetchUpdates, handleUpdates])

  // fetch updates once problems are eliminated
  useEffect(() => {
    if (needsRefresh.current && problems && !problems.length) {
      needsRefresh.current = false
      fetchUpdates().then(handleUpdates)
    }
  }, [problems, fetchUpdates, handleUpdates])

  const applyUpdates = useCallback(() => {
    const { newChanges, newOtherChanges, newEvents } = data
    if (lessons.length && !isFetchLoading) {
      setLessonMatrix((prev) => {
        const timetable = new Timetable(prev, {
          studyGroups: studyGroups,
          studyGroupMap: studyGroupMap,
          showOthersChanges: showOthersChanges,
        })
        if (newChanges)
          timetable.applyExistingChanges([
            ...newChanges,
            ...newOtherChanges,
            ...newEvents,
          ])
        return timetable.lessons
      })
    }
  }, [
    data,
    lessons.length,
    isFetchLoading,
    setLessonMatrix,
    studyGroups,
    studyGroupMap,
    showOthersChanges,
  ])

  const refetchUpdatesOnError = useCallback(() => {
    if (error) fetchUpdates().then(handleUpdates)
  }, [error, fetchUpdates, handleUpdates])

  const changesPending = useMemo(
    () => data.newChanges && !!data.newChanges.length && !isFetchLoading,
    [data.newChanges, isFetchLoading]
  )

  const otherChangesPending = useMemo(
    () =>
      ((data.newOtherChanges && !!data.newOtherChanges.length) ||
        (data.newEvents && !!data.newEvents.length)) &&
      !isFetchLoading,
    [data.newOtherChanges, data.newEvents, isFetchLoading]
  )

  const isLoading = useMemo(() => !lessons.length, [lessons.length])

  return {
    problems,
    setProblems,
    applyUpdates,
    refetchUpdatesOnError,
    changesPending,
    otherChangesPending,
    loadingUpdates: isLoading,
    errorInFetch: error,
  }
}
