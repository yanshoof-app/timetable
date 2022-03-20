import { useMemo, useRef } from 'react'
import { useStorage } from '../contexts/Storage'
import { DayOfWeek } from '../interfaces'

export default function useCurrentDay() {
  const { updateTime } = useStorage()
  const dateRef = useRef(new Date())
  return useMemo(() => {
    const day = dateRef.current.getDay(),
      hours = dateRef.current.getHours()
    if (day == 6 && hours >= updateTime) return 0 as DayOfWeek // circle days
    return (hours >= updateTime ? day + 1 : day) as DayOfWeek
  }, [updateTime])
}
