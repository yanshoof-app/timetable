import { useEffect } from 'react'
import { useStorage } from '../contexts/Storage'
import { ClassesRequest } from '../pages/api/classes/[school]'
import { useHTTP } from './useHTTP'

const CLASSES_URL = '/api/classes'

export function useClasses(school: string): {
  classes: number[][]
  grades: number[]
  isLoading: boolean
} {
  const { data, isLoading, doFetch } = useHTTP<
    { school: string },
    { grades: []; classes: [] }
  >({
    path: `${CLASSES_URL}/${school}`,
    fetchOnMount: false,
    initialValue: {
      grades: [],
      classes: [],
    },
  })

  useEffect(() => {
    doFetch({ school: school })
  }, [doFetch, school])

  return { grades: data.grades, classes: data.classes, isLoading }
}
