import { useStorage } from '../contexts/Storage'
import { ClassesRequest } from '../pages/api/classes/[school]'
import { useHTTP } from './useHTTP'

const CLASSES_URL = '/api/classes'

export function useClasses(school: string): {
  classes: number[][]
  grades: number[]
  isLoading: boolean
} {
  const { data, isLoading } = useHTTP({
    path: `${CLASSES_URL}/${school}`,
    initialValue: {
      grades: [],
      classes: [],
    },
  })
  const grades = data.grades
  const classes = data.classes
  return { grades, classes, isLoading }
}
