import { useMemo, useRef } from 'react'
import { useStorage } from '../contexts/Storage'

export default function useCurrentDay() {
  const { updateTime } = useStorage()
  const dateRef = useRef(new Date())
  return useMemo(() => {
    const day = dateRef.current.getDay(),
      hours = dateRef.current.getHours()
    return hours >= updateTime ? day + 1 : day
  }, [updateTime])
}
