import { createLocalStorageState } from '../../hooks/useLocalStorageState'
import { ILesson } from '../../interfaces'

export const useLessonMatrixState = createLocalStorageState<ILesson[][]>(
  'lessons',
  {
    decode: (str?: string) => {
      try {
        return (JSON.parse(str) as ILesson[][] | null) || []
      } catch (e) {
        return []
      }
    },
    toStorable: (value: ILesson[][]) => JSON.stringify(value),
  }
)

export const useLastUserUpdate = createLocalStorageState<Date>(
  'lastUserUpdate',
  {
    decode: (str?: string) => (str ? new Date(str) : new Date(0)),
    toStorable: (value: Date) => value.toISOString(),
  }
)
