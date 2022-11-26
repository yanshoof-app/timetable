import { useCallback, useEffect, useMemo, useState } from 'react'

export type SessionConnectHandler = (ev: Event) => any
export type SessionMessageHnalder = (ev: MessageEvent<any>) => any
export type SessionDisconnectHandler = (ev: Event) => any

export type ConnectFN = (uri: string) => void
export type SendMessageFN = <T extends object>(args: T) => void

export type SessionHook = [boolean, ConnectFN, SendMessageFN, Function]

const useSocketEventHandler = (
  ws: WebSocket,
  ev: keyof WebSocketEventMap,
  handler: (this: WebSocket, ev: Event | MessageEvent<any> | CloseEvent) => any
) => {
  useEffect(() => {
    if (!ws) return
    ws.addEventListener(ev, handler)
    return () => {
      ws.removeEventListener(ev, handler)
    }
  }, [ws, ev, handler])
}

export default function useWebSocket(
  onOpen: SessionConnectHandler,
  onMessage: SessionMessageHnalder,
  onClose: SessionDisconnectHandler
): SessionHook {
  const [session, setSession] = useState(null as unknown as WebSocket)

  useSocketEventHandler(session, 'open', onOpen)
  useSocketEventHandler(session, 'message', onMessage)
  useSocketEventHandler(session, 'close', onClose)

  const connect: ConnectFN = useCallback((uri: string) => {
    const ws = new WebSocket(uri)
    setSession(ws)
  }, [])

  const sendMessage = <T extends object>(args: T) => {
    session.send(JSON.stringify(args))
  }

  const close = useCallback(() => {
    if (session.readyState === session.OPEN) session.close(1000)
  }, [session])

  const isConnected = useMemo(
    () => session && session.readyState === session.OPEN,
    [session]
  )

  useEffect(() => {
    if (session)
      return () => {
        close()
      }
  }, [session, close])

  return [isConnected, connect, sendMessage, close]
}