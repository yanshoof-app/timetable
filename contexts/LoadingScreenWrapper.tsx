import { useState } from 'react'
import AppLoadingScreen from '../components/ui/LoadingScreens/AppLoadingScreen'
import { useClientRender } from '../hooks/useClientRender'

export function LoadingScreenWrapper({ children }) {
  const isClient = useClientRender()
  const [showAnimation, setAnimation] = useState(true)

  const exitAnimation = () => {
    return (
      <div>
        <AppLoadingScreen fade="out" />
        {children}
      </div>
    )
  }

  if (!isClient) {
    return <AppLoadingScreen />
  } else {
    setTimeout(() => {
      setAnimation(false)
    }, 500)
    return (
      <>
        {showAnimation ? (
          <div>
            <AppLoadingScreen fade="out" />
            {children}
          </div>
        ) : (
          children
        )}
      </>
    )
  }
}
