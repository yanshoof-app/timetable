import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Wrapper } from '../../components/types'
import { useHTTP } from '../../hooks/useHTTP'
import useValueChangeCallback from '../../hooks/useValueChangeCallback'
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
    ctx.doFetch()
  }, [ctx])
  return ctx
}

export default function FullTimetableProvider({ children }: Wrapper) {
  const { data, doFetch: fetchTimetable } = useHTTP<
    IFullTimetableReqType,
    LessonOrMultiple[][]
  >({
    path: FULL_TIMETABLE_URL,
    fetchOnMount: false,
    initialValue: [],
  })
  const [timetable, setTimetable] = useState([])
  const hasFetched = useRef(false)
  const { school, classId } = useStorage()

  const doFetch = useCallback(() => {
    if (hasFetched.current || !school || !classId) return
    fetchTimetable({ school, classId })
    hasFetched.current = true
  }, [school, classId, fetchTimetable])

  const refresh = useCallback(() => {
    hasFetched.current = false
    setTimetable([])
    doFetch()
  }, [doFetch])

  useEffect(() => {
    if (data.length > timetable.length) setTimetable(data)
  }, [data, timetable.length])

  useValueChangeCallback(school, refresh)
  useValueChangeCallback(classId, refresh)

  const isLoading = useMemo(() => !timetable.length, [timetable.length])

  return (
    <FullTimetableContext.Provider value={{ isLoading, doFetch, timetable }}>
      {children}
    </FullTimetableContext.Provider>
  )
}
