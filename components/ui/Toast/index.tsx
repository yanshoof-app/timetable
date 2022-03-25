import { useEffect, useMemo, useState } from 'react'
import { useTimetable } from '../../../contexts/Timetable'
import { Notification, Warning } from '../../icons'
import Toast from './Toast'
import { useToastContent } from './useToastContent'

export default function TimetableUpdatesToast() {
  const { errorInFetch, changesPending, loadingUpdates } = useTimetable()
  const [showToast, setToastShown] = useState(false)
  const toastProps = useToastContent()

  useEffect(() => {
    setToastShown(true)
  }, [errorInFetch, changesPending, loadingUpdates])

  return <>{showToast && <Toast {...toastProps} showToast={setToastShown} />}</>
}
