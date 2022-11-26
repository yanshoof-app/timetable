// An extension of the useWebSocket hook that fits the Operations server

import { useUnmountEffect } from 'framer-motion'
import { useCallback, useEffect, useMemo } from 'react'
import { useStorage } from '../contexts/Storage'
import useWebSocket from './useWebsocket'

const WS_URL = process.env.NEXT_PUBLIC_WS_URL

export interface IOperationEventHandlers {
  [eventName: string]: (args: any) => unknown
}

/**
 * Connects to the operations server
 * @param pathname the pathname of the ws connection
 * @param args the arguments of the connection
 */
export default function useOperation<T extends object>(
  pathname: string,
  handlers: IOperationEventHandlers,
  args: T = {} as T
) {
  const { school, classIds } = useStorage()
  const params = useMemo(
    () =>
      school && classIds.length
        ? new URLSearchParams({
            school,
            classes: JSON.stringify(classIds),
            ...args,
          }).toString()
        : undefined,
    [args, classIds, school]
  )
  const openHandler = useMemo(
    () => handlers.open || (() => {}),
    [handlers.open]
  )
  const closeHandler = useMemo(
    () => handlers.close || (() => {}),
    [handlers.close]
  )
  const messageHandler = useCallback(
    (ev: MessageEvent<any>) => {
      const { event, ...args } = JSON.parse(ev.data)
      if (!event || !handlers[event]) return
      handlers[event](args)
    },
    [handlers]
  )
  const [isConnected, connect] = useWebSocket(
    openHandler,
    messageHandler,
    closeHandler
  )

  useEffect(() => {
    if (params && !isConnected) connect(`${WS_URL}${pathname}?${params}`)
  }, [pathname, params, connect, isConnected])
}