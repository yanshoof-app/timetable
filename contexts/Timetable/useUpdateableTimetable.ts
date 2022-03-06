import { useCallback, useEffect, useMemo } from 'react'
import { useClientRender } from '../../hooks/useClientRender'
import { useHTTP } from '../../hooks/useHTTP'
import { ITimetableUpdates } from '../../interfaces'
import { QueryParams, QueryParamsSettings, Timetable } from '../../utils'
import { useStorage } from '../Storage'
import { useLessonMatrixState } from './localstorage'

const UPDATES_ROUTE = 'TODO' // TODO

export function useUpdateableTimetable() {
  const [lessonMatrix, setLessonMatrix] = useLessonMatrixState()
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
    const { overrideTimetable } = updates.data
    if (overrideTimetable) setLessonMatrix(overrideTimetable)
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

  return { changesPending, applyUpdates, errorInFetch, lessons: lessonMatrix }
}
