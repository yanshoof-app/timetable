import { useEffect, useState } from 'react'

export function useClientRender() {
  const [isClientSide, setClientSide] = useState(false)
  useEffect(() => {
    setClientSide(true)
  }, [])
  return isClientSide
}
