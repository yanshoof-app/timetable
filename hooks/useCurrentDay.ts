import { useMemo, useRef } from 'react'
import { DayFilterer } from '../components/forms/DayPick'
import { useStorage } from '../contexts/Storage'
import { DayOfWeek, DAYS_IN_WEEK } from '../interfaces'
import { HEBREW_DAYS } from './useHebrewDate'

function nextDay(day: DayOfWeek): DayOfWeek {
  if (day == 6) return 0 as DayOfWeek
  return (day + 1) as DayOfWeek
}

export default function useCurrentDay(filterDays: DayFilterer = () => true) {
  const { updateTime } = useStorage()
  const dateRef = useRef(new Date())
  const currentDay = useMemo(() => {
    let day = dateRef.current.getDay() as DayOfWeek
    const hours = dateRef.current.getHours()
    if (hours >= updateTime) day = nextDay(day)
    let forwardCount = 0
    while (!filterDays(HEBREW_DAYS[day], day) && forwardCount < DAYS_IN_WEEK) {
      day = nextDay(day)
      forwardCount++
    }
    return day
  }, [updateTime, filterDays])
  return { currentDay, date: dateRef }
}