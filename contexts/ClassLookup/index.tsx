/**
 * The context responsible for saving class options and retrieving the class lookup object from the client from comparasions
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { Wrapper } from '../../components/types'
import { useHTTP } from '../../hooks/useHTTP'
import useValueChangeCallback from '../../hooks/useValueChangeCallback'
import { ClassLookup } from '../../utils'
import { useStorage } from '../Storage'
import { IClassLookupContext } from './types'

const CLASSES_URL = '/api/classes'

export const ClassLookupContext = createContext<IClassLookupContext>(
  {} as IClassLookupContext
)

export function useClassLookup() {
  const ctx = useContext(ClassLookupContext)
  // if classes are not fetched, fetch them
  useEffect(() => {
    ctx.revalidate()
  }, [ctx])
  return ctx
}

export default function ClassLookupProvider({ children }: Wrapper) {
  const { school, classIds, setClassIds, grades, setGrades } = useStorage()
  const hasFetched = useRef(false)

  const { doFetch } = useHTTP<
    { school: string },
    { grades: number[]; classes: number[][] }
  >({
    path: `${CLASSES_URL}/${school}`,
    fetchOnMount: false,
    initialValue: {
      grades: [],
      classes: [],
    },
  })

  const classLookup = useMemo(
    () => new ClassLookup(classIds, grades),
    [classIds, grades]
  )

  const isLoadingClasses = useMemo(() => !grades.length, [grades.length])

  const revalidate = useCallback(() => {
    if (hasFetched.current || !school) return
    doFetch().then(({ classes: newClassIds, grades: newGrades }) => {
      if (newClassIds.length != newGrades.length)
        // invalid value received, abort
        return
      if (newGrades.length > grades.length) {
        setGrades(newGrades)
        setClassIds(newClassIds)
      }
    })
    hasFetched.current = true
  }, [school, doFetch, grades.length, setGrades, setClassIds])

  // fetch if value does not exist in local storage
  useEffect(() => {
    if (!grades.length) {
      doFetch().then(({ classes: newClassIds, grades: newGrades }) => {
        setGrades(newGrades)
        setClassIds(newClassIds)
      })
    }
  }, [grades.length, doFetch, setGrades, setClassIds])

  return (
    <ClassLookupContext.Provider
      value={{
        isLoadingClasses,
        revalidate,
        getId: (grade, num) => classLookup.getId(grade, num),
      }}
    >
      {children}
    </ClassLookupContext.Provider>
  )
}
