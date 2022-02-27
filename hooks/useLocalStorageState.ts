import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

export interface ILocalStorageHandler<T> {
  getValue(str?: string): T
  toStorable(value: T): string
}

export function createLocalStorageState<T>(
  field: string,
  { getValue, toStorable }: ILocalStorageHandler<T>
) {
  return function useLocalStorageState(): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState(getValue(localStorage.getItem(field)))

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
