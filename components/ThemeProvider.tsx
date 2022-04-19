import { useLayoutEffect } from 'react'
import { useStorage } from '../contexts/Storage'
import useDarkMode from '../hooks/useDarkMode'
import { Wrapper } from './types'

export default function ThemeProvider({ children }: Wrapper) {
  const isDarkMode = useDarkMode()
  useLayoutEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [isDarkMode])
  return <>{children}</>
}
