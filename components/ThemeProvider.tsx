import { useLayoutEffect } from 'react'
import { useStorage } from '../contexts/Storage'
import { Wrapper } from './types'

export default function ThemeProvider({ children }: Wrapper) {
  const { theme } = useStorage()
  useLayoutEffect(() => {
    if (
      theme === 'dark' ||
      (theme === 'system' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
      document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [theme])
  return <>{children}</>
}
