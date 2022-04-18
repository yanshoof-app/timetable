import { useState, useEffect } from 'react'
import Toast from '.'
import { useUpdates } from '../../../contexts/Updates'
import { useToastContent } from '../../../hooks/useToastContent'
import { Wrapper } from '../../types'

export default function TimetableUpdatesWrapper({ children }: Wrapper) {
  const [showToast, setToastVisible] = useState(false)
  const toastProps = useToastContent()
  const { errorInFetch, changesPending, loadingUpdates } = useUpdates()

  useEffect(() => {
    setToastVisible(!loadingUpdates)
  }, [errorInFetch, changesPending, loadingUpdates])

  return (
    <>
      {showToast && <Toast {...toastProps} setToastVisible={setToastVisible} />}
      {children}
    </>
  )
}
