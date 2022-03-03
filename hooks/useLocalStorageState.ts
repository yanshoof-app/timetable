import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useClientRender } from './useClientRender'

export interface ILocalStorageHandler<T> {
  decode(str?: string): T
  toStorable(value: T): string
}

export function createLocalStorageState<T>(
  field: string,
  { decode, toStorable }: ILocalStorageHandler<T>
) {
  return function useLocalStorageState(): [T, Dispatch<SetStateAction<T>>] {
    const isClientSide = useClientRender()
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
      window.addEventListener('beforeunload', save)
      return () => {
        window.removeEventListener('beforeunload', save)
      }
    }, [save])

    return [value, setValue]
  }
}
