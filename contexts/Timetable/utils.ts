import { useCallback } from 'react'
import { DayOfWeek, HourOfDay } from '../../interfaces'
import { useStorage } from '../Storage'
import { IStorageContext } from '../Storage/types'
import { IUpdateableTimetable } from './useUpdateableTimetable'

export function useRemoveProblem(updateableTimetable: IUpdateableTimetable) {
  return useCallback(
    (day: DayOfWeek, hour: HourOfDay) => {
      updateableTimetable.setProblems((prev) =>
        prev.filter(([d, h]) => d != day || h != hour)
      )
    },
    [updateableTimetable.setProblems]
  )
}

