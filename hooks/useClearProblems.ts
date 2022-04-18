import { useCallback } from 'react'
import { useUpdates } from '../contexts/Updates'
import { ILesson } from '../interfaces'
import useScheduleSet from './useScheduleSet'

export function useClearProblems() {
  const { problems, setProblems } = useUpdates()
  const { appendScheduleSetting } = useScheduleSet()
  return useCallback(() => {
    for (let [day, hour] of problems) {
      appendScheduleSetting({ day: day, hour: [hour], lesson: {} as ILesson })
    }
    setProblems([])
  }, [appendScheduleSetting, problems, setProblems])
}
