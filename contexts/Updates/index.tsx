import { createContext, useEffect, useState } from 'react'
import { Wrapper } from '../../components/types'
import { useTimetable } from '../Timetable'
import { createUseContextHook } from '../utils'
import { IUpdatesContext } from './types'
import { useToastContent } from './useToastContent'

export const UpdatesContext = createContext<IUpdatesContext>(
  {} as IUpdatesContext
)

export const useTimetableUpdates = createUseContextHook(UpdatesContext)

export default function TimetableUpdatesProvider({ children }: Wrapper) {
  const [showToast, setToastVisible] = useState(false)
  const toastProps = useToastContent()
  const { errorInFetch, changesPending, loadingUpdates } = useTimetable()

  useEffect(() => {
    setToastVisible(!loadingUpdates)
  }, [errorInFetch, changesPending, loadingUpdates])

  return (
    <UpdatesContext.Provider
      value={{ ...toastProps, setToastVisible, showToast }}
    >
      {children}
    </UpdatesContext.Provider>
  )
}
