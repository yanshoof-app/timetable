import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

const EXPIRES = 'expires'
const COOKIE_LIFE = 60

const valueFromCookie = (field: string, cookie: string) => {
  return cookie.substring(field.length + 1)
}

const setCookie = (field, value) => {
  const exprsDate = new Date()
  exprsDate.setDate(exprsDate.getDate() + COOKIE_LIFE)
  document.cookie = `${field}=${value};${EXPIRES}=${exprsDate}`
}

const getCookie = (field) => {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    if (cookie.substring(0, field.length) === field)
      return valueFromCookie(field, cookie)
  }
}

export interface ILocalStorageHandler<T> {
  decode(str?: string): T
  toStorable(value: T): string
}

export const eventName = 'pagehide'

export function createLocalStorageState<T>(
  field: string,
  { decode, toStorable }: ILocalStorageHandler<T>
) {
  return function useLocalStorageState(): [T, Dispatch<SetStateAction<T>>] {
    const [isClientSide] = useState(typeof window != 'undefined') // loads quicker than the useClientSide() to prevent lugs
    const [value, setValue] = useState(
      isClientSide ? decode(getCookie(field)) : undefined
    )

    useEffect(() => {
      if (isClientSide) setValue(decode(getCookie(field)))
    }, [isClientSide])

    const save = useCallback(() => {
      isClientSide && setCookie(field, toStorable(value))
    }, [value, isClientSide])

    useEffect(() => {
      /*const isOnIOS =
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPhone/i)*/
      window.addEventListener(eventName, save)
      return () => {
        window.removeEventListener(eventName, save)
      }
    }, [save])

    return [value, setValue]
  }
}
