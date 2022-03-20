import { useCallback, useEffect, useMemo, useState } from 'react'
import { useClientRender } from '../../hooks/useClientRender'
import { useHTTP } from '../../hooks/useHTTP'
import {
  DayOfWeek,
  HourOfDay,
  ILesson,
  ITimetableUpdates,
} from '../../interfaces'
import { QueryParams, QueryParamsSettings, Timetable } from '../../utils'
import { useStorage } from '../Storage'
import { useLessonMatrixState } from './localStorageState'

const UPDATES_ROUTE = 'TODO' // TODO

export interface IUpdateableTimetable {
  lessons: ILesson[][]
  applyUpdates(): unknown
  errorInFetch: boolean
  changesPending: boolean
  problems: [DayOfWeek, HourOfDay][] //TODO in timetable object
}

export function useUpdateableTimetable(): IUpdateableTimetable {
  const [lessonMatrix, setLessonMatrix] = useLessonMatrixState()
  const [problems, setProblems] = useState<[DayOfWeek, HourOfDay][]>([])
  const settings = useStorage()
  const isClient = useClientRender()
  const qParamsSettings = useMemo(
    () => (isClient ? QueryParamsSettings.toQueryParams(settings) : undefined),
    [settings, isClient]
  )
  const updates = useHTTP<QueryParams, ITimetableUpdates>({
    path: UPDATES_ROUTE,
    reqData: qParamsSettings,
  })

  // update timetable immedietly if overriden by server
  useEffect(() => {
    const { overrideTimetable, problems } = updates.data
    if (overrideTimetable) setLessonMatrix(overrideTimetable)
    setProblems(problems)
  }, [updates, setLessonMatrix])

  // use in toast
  const applyUpdates = useCallback(() => {
    const { newChanges } = updates.data
    if (lessonMatrix.length && !updates.isLoading) {
      const timetable = new Timetable(lessonMatrix, settings.showOthersChanges)

      if (newChanges) timetable.applyExistingChanges(newChanges)
      setLessonMatrix(timetable.lessons)
    }
  }, [updates, lessonMatrix, settings.showOthersChanges])

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
    lessons: lessonMatrix,
  }
}
