import { useMemo } from 'react'
import { useStorage } from '../contexts/Storage'

export default function useDarkMode() {
  const { theme } = useStorage()
  return useMemo(
    () =>
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches),
    [theme]
  )
}
