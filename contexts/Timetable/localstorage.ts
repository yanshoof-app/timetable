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
