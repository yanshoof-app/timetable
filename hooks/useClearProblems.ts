import { useCallback } from 'react'
import { useTimetable } from '../contexts/Timetable'
import { ILesson } from '../interfaces'
import useScheduleSet from './useScheduleSet'

export function useClearProblems() {
  const { problems, setProblems } = useTimetable()
  const { appendScheduleSetting } = useScheduleSet()
  return useCallback(() => {
    for (let [day, hour] of problems) {
      appendScheduleSetting({ day: day, hour: [hour], lesson: {} as ILesson })
    }
    setProblems([])
  }, [appendScheduleSetting, problems, setProblems])
}
