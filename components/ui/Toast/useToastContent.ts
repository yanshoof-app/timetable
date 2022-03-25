import { useMemo } from 'react'
import { useTimetable } from '../../../contexts/Timetable'
import { Calendar, Done, Warning, Notification } from '../../icons'
import { ToastProps } from './Toast'

const ERROR_IN_FETCH = 'הייתה שגיאה בהבאת המידע'
const TRY_AGAIN = 'נסו שוב'
const CHANGES_PENDING = 'יש שינויים לכיתה שלך'
const APPLY_CHANGES = 'רענון'
const LOADING_DATA = 'טוען שינויים...'
const ALL_UPDATED = 'הכל מעודכן'

export function useToastContent(): Omit<ToastProps, 'showToast'> {
  const {
    errorInFetch,
    changesPending,
    loadingUpdates,
    applyUpdates,
    refetchUpdates,
  } = useTimetable()
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
        : loadingUpdates
        ? { icon: Calendar, content: LOADING_DATA, iconClass: '' }
        : { icon: Done, content: ALL_UPDATED, iconClass: 'text-lime-400' },
    [errorInFetch, changesPending, loadingUpdates]
  )
}
