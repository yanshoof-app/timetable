import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'

/**
 * Saves the current URL before changing the route.
 */
const useBackPress = (defaultTo: string) => {
  const [previousRoute, setPreviousRouter] = useState(null)
  const router = useRouter()

  const handleBeforeHistoryChange = useCallback(
    (url) => {
      const [nextUrl] = url?.split('?') || []

      if (nextUrl !== router.asPath) {
        setPreviousRouter(router.asPath)
      }
    },
    [router.asPath]
  )

  useEffect(() => {
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange)

    return () => {
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange)
    }
  }, [handleBeforeHistoryChange, router.events])

  const back = useCallback(() => {
    if (previousRoute) router.back()
    else router.push(defaultTo)
  }, [defaultTo, previousRoute, router])

  return { back }
}

export default useBackPress
