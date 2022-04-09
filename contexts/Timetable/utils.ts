import { Dispatch, SetStateAction, useCallback } from 'react'
import { DayOfWeek, HourOfDay } from '../../interfaces'
import { IUpdateableTimetable } from './useUpdateableTimetable'

export function useRemoveProblems(updateableTimetable: IUpdateableTimetable) {
  return useCallback(
    (day: DayOfWeek, hours: HourOfDay[]) => {
      updateableTimetable.setProblems((prev) =>
        prev.filter(([d, h]) => d != day || hours.every((hour) => hour != h))
      )
    },
    [updateableTimetable.setProblems]
  )
}

export function useApplyLessons(
  setStudyGroupMap: Dispatch<SetStateAction<Map<string, number>>>,
  removeProblems: (day: DayOfWeek, hours: HourOfDay[]) => unknown,
  updateableTimetable: IUpdateableTimetable
) {}
