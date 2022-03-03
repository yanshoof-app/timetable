import { useRef, useEffect, EffectCallback } from 'react'

export function useDidUpdateEffect(fn: EffectCallback, inputs: unknown[]) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) {
      return fn()
    }
    didMountRef.current = true
  }, inputs)
}
