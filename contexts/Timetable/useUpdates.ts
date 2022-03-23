import { useEffect, useMemo, useRef } from 'react'
import { useClientRender } from '../../hooks/useClientRender'
import { useHTTP } from '../../hooks/useHTTP'
import { ITimetableUpdates } from '../../interfaces'
import { QueryParams, QueryParamsSettings } from '../../utils'
import { useStorage } from '../Storage'
import { useLastUserUpdate } from './localStorageState'

const UPDATES_ROUTE = '/api/timetable/updates'

export type UpdatesQParams = QueryParams & {
  school: string
  classId: string
  // lastUserUpdate: string
}

export default function useUpdates() {
  const [lastUserUpdate, setLastUserUpdate] = useLastUserUpdate()
  const fetched = useRef(false)
  const { showOthersChanges, studyGroupMap, studyGroups, school, classId } =
    useStorage()
  const { doFetch, data, isLoading, error } = useHTTP<
    UpdatesQParams,
    ITimetableUpdates
  >({
    path: UPDATES_ROUTE,
    fetchOnMount: false,
  })

  // fetch exactly once each render
  useEffect(() => {
    if (!fetched.current) {
      const settings = QueryParamsSettings.toQueryParams({
        showOthersChanges,
        studyGroupMap,
        studyGroups,
        school,
        classId,
        lastUserUpdate: lastUserUpdate.toISOString(),
      })
      doFetch(settings)
      fetched.current = true
    }
  }, [
    doFetch,
    school,
    classId,
    showOthersChanges,
    studyGroupMap,
    studyGroups,
    lastUserUpdate,
  ])

  // update last change date
  useEffect(() => {
    if (!isLoading && !error && fetched.current) setLastUserUpdate(new Date())
  }, [error, isLoading])
  return { data, isLoading, error }
}
