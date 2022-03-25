import { useMemo } from 'react'
import { useTimetable } from '../../../contexts/Timetable'
import { Done, Warning, Notification } from '../../icons'
import { ToastProps } from './Toast'

const ERROR_IN_FETCH = 'הייתה שגיאה בהבאת המידע'
const TRY_AGAIN = 'נסו שוב'
const CHANGES_PENDING = 'יש שינויים לכיתה שלך'
const APPLY_CHANGES = 'רענון'
const ALL_UPDATED = 'הכל מעודכן'

export function useToastContent(): Omit<ToastProps, 'showToast'> {
  const { errorInFetch, changesPending, applyUpdates, refetchUpdates } =
    useTimetable()
  return useMemo(
    () =>
      errorInFetch
        ? {
            icon: Warning,
            content: ERROR_IN_FETCH,
            actionContent: TRY_AGAIN,
            onClick: refetchUpdates,
          }
        : changesPending
        ? {
            icon: Notification,
            content: CHANGES_PENDING,
            actionContent: APPLY_CHANGES,
            onClick: applyUpdates,
          }
        : { icon: Done, content: ALL_UPDATED, iconClassName: 'text-lime-400' },
    [errorInFetch, changesPending]
  )
}
