import { useCallback } from 'react'
import { DayFilterer } from '../components/forms/DayPick'
import { SupportedLesson } from '../components/timetable/Timetable'
import { isAnyLessonObj } from '../interfaces'

export function useDayFilterer(timetable: SupportedLesson[][]): DayFilterer {
  return useCallback(
    (_, index) => timetable.length && timetable[index].some(isAnyLessonObj),
    [timetable]
  )
}
