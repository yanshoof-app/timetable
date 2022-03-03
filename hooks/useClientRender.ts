import { useEffect, useState } from 'react'

export function useClientRender() {
  const [isClientSide, setClientSide] = useState(typeof window != 'undefined')
  useEffect(() => {
    setClientSide(true)
  }, [])
  return isClientSide
}
