import { useCallback, useMemo, useState } from 'react'

export function useIteration<T>(arr: T[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const currentItem = useMemo(() => arr[currentIndex], [arr, currentIndex])
  const nextDisabled = useMemo(
    () => currentIndex == arr.length - 1,
    [currentIndex, arr]
  )
  const prevDisabled = useMemo(() => currentIndex == 0, [currentIndex])
  const next = useCallback(() => setCurrentIndex((i) => i + 1), [])
  const prev = useCallback(() => setCurrentIndex((i) => i - 1), [])
  return { currentItem, nextDisabled, next, prevDisabled, prev }
}
