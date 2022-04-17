import { useMemo } from 'react'
import { useTimetable } from '../Timetable'
import { Done, Warning, Notification } from '../../components/icons'
import { ToastProps } from '../../components/ui/Toast'

const ERROR_IN_FETCH = 'הייתה שגיאה בהבאת המידע'
const TRY_AGAIN = 'נסו שוב'
const CHANGES_PENDING = 'יש שינויים לכיתה שלך'
const APPLY_CHANGES = 'רענון'
const ALL_UPDATED = 'הכל מעודכן'

export function useToastContent(): Omit<ToastProps, 'setToastVisible'> {
  const { errorInFetch, changesPending, applyUpdates, refetchUpdatesOnError } =
    useTimetable()
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
        : {
            icon: Done,
            content: ALL_UPDATED,
            iconClassName: 'text-celebration-400',
          },
    [errorInFetch, changesPending, applyUpdates, refetchUpdatesOnError]
  )
}
