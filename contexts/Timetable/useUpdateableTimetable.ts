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

const UPDATES_ROUTE = '/api/timetable/updates'

export interface IUpdateableTimetable {
  lessons: ILesson[][]
  applyUpdates(): unknown
  errorInFetch: boolean
  changesPending: boolean
  problems: [DayOfWeek, HourOfDay][] //TODO in timetable object
}

export type UpdatesQParams = QueryParams & {
  school: string
  classId: string
  // lastUserUpdate: string
}

export function useUpdateableTimetable(): IUpdateableTimetable {
  const [lessonMatrix, setLessonMatrix] = useLessonMatrixState()
  const [problems, setProblems] = useState<[DayOfWeek, HourOfDay][]>([])
  const { school, classId, showOthersChanges, studyGroupMap, studyGroups } =
    useStorage()
  const isClient = useClientRender()
  const qParamsSettings = useMemo<UpdatesQParams>(
    () =>
      isClient
        ? QueryParamsSettings.toQueryParams({
            showOthersChanges,
            studyGroupMap,
            studyGroups,
            school,
            classId,
          })
        : undefined,
    [school, classId, showOthersChanges, studyGroupMap, studyGroups, isClient]
  )
  const updates = useHTTP<UpdatesQParams, ITimetableUpdates>({
    path: UPDATES_ROUTE,
    reqData: qParamsSettings, //should also send school and classId
  })

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
