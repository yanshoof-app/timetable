import { getCookie, setCookies } from 'cookies-next'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

const EXPIRES = 'expires'
const COOKIE_LIFE = 60

//Returns the value of cookie
const valueFromCookie = (field: string, cookie: string) => {
  console.log(cookie)
  return cookie.substring(field.length + 1)
}

const setCookie = (field: string, value: string) => {
  const exprsDate = new Date()
  exprsDate.setDate(exprsDate.getDate() + COOKIE_LIFE)
  setCookies(field, value, { expires: exprsDate })
  //document.cookie = `${field}=${value};${EXPIRES}=${exprsDate}` // showOtherChanges=true;expires=Fri Jun 22 2022 01:28:48 GMT+0300
}

/*
const getCookie = (field: string): string | undefined => {
  const cookies = document.cookie.split('; ')

  for (let cookie of cookies) {
    if (cookie.substring(0, field.length) === field)
      return valueFromCookie(field, cookie)
  }
  return null
*/

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
    const [isClientSide] = useState(typeof document != 'undefined') // loads quicker than the useClientSide() to prevent lugs
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
