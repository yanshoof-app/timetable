import { useState, useEffect, useCallback } from 'react'
import { ILocalStorageHandler } from './useLocalStorageState'
import { getCookie, setCookies } from 'cookies-next'

export default function createCookieState<T>(
  field: string,
  { decode, toStorable }: ILocalStorageHandler<T>
) {
  return function useCookieState() {
    const [value, setValue] = useState(decode(getCookie(field) as string))

    useEffect(() => {
      setValue(decode(localStorage.getItem(field)))
    }, [])

    const save = useCallback(() => {
      localStorage.setItem(field, toStorable(value))
    }, [value])

    useEffect(() => {
      window.addEventListener('beforeunload', save)
      return () => {
        window.removeEventListener('beforeunload', save)
      }
    }, [save])

    return [value, setValue]
  }
}
