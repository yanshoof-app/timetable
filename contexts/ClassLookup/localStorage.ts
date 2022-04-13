import { createLocalStorageState } from '../../hooks/useLocalStorageState'

export const useClassMatrixState = createLocalStorageState<number[][]>(
  'classMatrix',
  {
    decode: (str?: string) => {
      try {
        return (JSON.parse(str) as number[][] | null) || []
      } catch (e) {
        return []
      }
    },
    toStorable: (value: number[][]) => JSON.stringify(value),
  }
)

export const useGradeState = createLocalStorageState<number[]>('grades', {
  decode: (str?: string) => {
    try {
      return (JSON.parse(str) as number[] | null) || []
    } catch (e) {
      return []
    }
  },
  toStorable: (value: number[]) => JSON.stringify(value),
})
