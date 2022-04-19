import { useMemo } from 'react'

export default function useExamples(
  ex1: { light: StaticImageData; dark: StaticImageData },
  ex2: { light: StaticImageData; dark: StaticImageData },
  isDarkMode: boolean
) {
  return useMemo(() => {
    if (isDarkMode) {
      return { ex1: ex1.dark, ex2: ex1.dark }
    } else {
      return { ex1: ex1.light, ex2: ex1.light }
    }
  }, [ex1, ex2, isDarkMode])
}
