import { useCallback, useEffect, useState } from 'react'

export type SessionConnectHandler = (ev: Event) => any
export type SessionMessageHnalder = (ev: MessageEvent<any>) => any
export type SessionDisconnectHandler = (ev: Event) => any

export interface IEventMessage {
  context: string
}

export type ConnectFN = (classes: number[][], grades: number[]) => void

export type SessionHook = [
  ConnectFN,
  <T extends IEventMessage>(args: T) => void,
  () => void
]

export default function useWebsocket(
  onOpen: SessionConnectHandler,
  onMessage: SessionMessageHnalder,
  onClose: SessionDisconnectHandler
): SessionHook {
  const [session, setSession] = useState(null as unknown as WebSocket)

  const updateOpenHandler = () => {
    if (!session) return
    session.addEventListener('open', onOpen)
    return () => {
      session.removeEventListener('open', onOpen)
    }
  }

  const updateMessageHandler = () => {
    if (!session) return
    session.addEventListener('message', onMessage)
    return () => {
      session.removeEventListener('message', onMessage)
    }
  }

  const updateCloseHandler = () => {
    if (!session) return
    session.addEventListener('close', onClose)
    return () => {
      session.removeEventListener('close', onClose)
    }
  }

  useEffect(updateOpenHandler, [session, onOpen])
  useEffect(updateMessageHandler, [session, onMessage])
  useEffect(updateCloseHandler, [session, onClose])

  const connect: ConnectFN = useCallback((classes, grades) => {
    const uri = `` // TODO
    const ws = new WebSocket(uri)
    setSession(ws)
  }, [])

  const sendMessage = <T extends IEventMessage>(args: T) => {
    session.send(JSON.stringify(args))
  }

  const close = useCallback(() => {
    if (session.readyState === session.OPEN) session.close(1001)
  }, [session])

  return [connect, sendMessage, close]
}