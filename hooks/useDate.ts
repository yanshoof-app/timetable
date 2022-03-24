import { useMemo } from 'react'
import { DayOfWeek } from '../interfaces'

export default function useDate(day: DayOfWeek, date: Date) {
  return useMemo(() => {
    let time = date.getTime()
    const daysToAdd = day - date.getDay()
    time += daysToAdd * 24 * 60 * 60 * 1000
    return new Date(time)
  }, [day, date])
}
