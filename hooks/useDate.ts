import { useMemo } from 'react'
import { DayOfWeek } from '../interfaces'

export default function useDate(day: DayOfWeek, date: Date) {
  return useMemo(() => dateOfDay(day, date), [day, date])
}

export function dateOfDay(day: DayOfWeek, date: Date) {
  let time = date.getTime()
  const daysToAdd = day - date.getDay()
  time += daysToAdd * 24 * 60 * 60 * 1000
  return new Date(time)
}
