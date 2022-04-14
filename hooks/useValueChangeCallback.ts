import { useEffect, useRef } from 'react'

export default function useValueChangeCallback<T>(
  value: T,
  callback: () => unknown
) {
  const valueRef = useRef(value)
  useEffect(() => {
    if (valueRef.current && valueRef.current !== value) callback()
    return () => {
      console.log(valueRef.current, value)
      valueRef.current = value
    }
  }, [callback, value])
}
