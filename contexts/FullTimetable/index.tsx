import { createContext, useCallback, useContext, useEffect } from 'react'
import { Wrapper } from '../../components/types'
import { useHTTP } from '../../hooks/useHTTP'
import { LessonOrMultiple } from '../../interfaces'
import { useStorage } from '../Storage'
import { IFullTimetableContext, IFullTimetableReqType } from './types'

const FULL_TIMETABLE_URL = '/api/timetable/initial'

export const FullTimetableContext = createContext<IFullTimetableContext>(
  {} as IFullTimetableContext
)

export function useFullTimetable() {
  const ctx = useContext(FullTimetableContext)
  // if timetable is not fetched, fetch it
  useEffect(() => {
    if (!ctx.isLoading && !ctx.timetable.length) ctx.doFetch()
  }, [ctx.isLoading, ctx.timetable])
  return ctx
}

export default function FullTimetableProvider({ children }: Wrapper) {
  const {
    isLoading,
    data: timetable,
    doFetch: fetchTimetable,
    error, // TODO: Handle errors
  } = useHTTP<IFullTimetableReqType, LessonOrMultiple[][]>({
    path: FULL_TIMETABLE_URL,
    fetchOnMount: false,
    initialValue: [],
  })
  const { school, classId } = useStorage()

  const doFetch = useCallback(
    () => fetchTimetable({ school, classId }),
    [school, classId]
  )

  return (
    <FullTimetableContext.Provider value={{ isLoading, doFetch, timetable }}>
      {children}
    </FullTimetableContext.Provider>
  )
}
