import React, { useState } from 'react'
import AppLoadingScreen from '../components/ui/LoadingScreens/AppLoadingScreen'
import { useClientRender } from '../hooks/useClientRender'

const LOADING_SCREEN_DURATION = 250
const TRANSITION_DURATION = 500

export function LoadingScreenWrapper({ children }) {
  const isClient = useClientRender()

  const [showChild, setShowChild] = useState(false)
  const [showAnimation, setShowAnimation] = useState(true)

  if (!isClient) return <AppLoadingScreen />
  else {
    setTimeout(() => {
      setShowAnimation(false)
    }, LOADING_SCREEN_DURATION + TRANSITION_DURATION)

    setTimeout(() => {
      setShowChild(true)
    }, LOADING_SCREEN_DURATION)

    return (
      <React.Fragment>
        {showChild && showAnimation && <AppLoadingScreen fade />}
        {showChild ? children : <AppLoadingScreen />}
      </React.Fragment>
    )
  }
}
