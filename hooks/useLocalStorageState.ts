import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

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
    const [isClientSide] = useState(typeof localStorage != 'undefined') // loads quicker than the useClientSide() to prevent lugs
    const [value, setValue] = useState(
      isClientSide ? decode(localStorage.getItem(field)) : undefined
    )

    useEffect(() => {
      if (isClientSide) setValue(decode(localStorage.getItem(field)))
    }, [isClientSide])

    const save = useCallback(() => {
      isClientSide && localStorage.setItem(field, toStorable(value))
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
