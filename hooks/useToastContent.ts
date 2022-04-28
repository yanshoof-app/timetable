import { useMemo } from 'react'
import { useUpdates } from '../contexts/Updates'
import { Done, Warning, Notification } from '../components/icons'
import { ToastProps } from '../components/ui/Toast'

const ERROR_IN_FETCH = 'הייתה שגיאה בהבאת המידע'
const TRY_AGAIN = 'נסו שוב'
const CHANGES_PENDING = 'יש לך שינויים חדשים'
const CHANGES_PENDING_TO_CLASS = 'יש שינויים לכיתה שלך'
const APPLY_CHANGES = 'רענון'
const ALL_UPDATED = 'הכל מעודכן'

export function useToastContent(): Omit<ToastProps, 'setToastVisible'> {
  const {
    errorInFetch,
    changesPending,
    otherChangesPending,
    applyUpdates,
    refetchUpdatesOnError,
  } = useUpdates()
  return useMemo(
    () =>
      errorInFetch
        ? {
            icon: Warning,
            content: ERROR_IN_FETCH,
            actionContent: TRY_AGAIN,
            onClick: refetchUpdatesOnError,
          }
        : changesPending
        ? {
            icon: Notification,
            content: CHANGES_PENDING,
            actionContent: APPLY_CHANGES,
            onClick: applyUpdates,
          }
        : otherChangesPending
        ? {
            icon: Notification,
            content: CHANGES_PENDING_TO_CLASS,
            actionContent: APPLY_CHANGES,
            onClick: applyUpdates,
          }
        : {
            icon: Done,
            content: ALL_UPDATED,
            iconClassName: 'text-celebration-400 dark:text-white',
          },
    [
      errorInFetch,
      refetchUpdatesOnError,
      changesPending,
      applyUpdates,
      otherChangesPending,
    ]
  )
}
