import { createLocalStorageState } from '../../hooks/useLocalStorageState'
import { ILesson } from '../../interfaces'

const isNewWeek = new Date().getDay() == 0

export const useLessonMatrixState = createLocalStorageState<ILesson[][]>(
  'lessons',
  {
    decode: (str?: string) => {
      try {
        if (isNewWeek) return []
        return (JSON.parse(str) as ILesson[][] | null) || []
      } catch (e) {
        return []
      }
    },
    toStorable: (value: ILesson[][]) => JSON.stringify(value),
  }
)
