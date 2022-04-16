import React, { useState } from 'react'
import AppLoadingScreen from '../components/ui/LoadingScreens/AppLoadingScreen'
import { useClientRender } from '../hooks/useClientRender'

const LOADING_SCREEN_DURATION = 250
const TRANSITION_DURATION = 250

export function LoadingScreenWrapper({ children }) {
  const isClient = useClientRender()

  const [showChild, setShowChild] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(true)

  if (!isClient) return <AppLoadingScreen />
  else {
    setTimeout(() => {
      setShowLoadingScreen(false)
    }, LOADING_SCREEN_DURATION + TRANSITION_DURATION)

    setTimeout(() => {
      setShowChild(true)
    }, LOADING_SCREEN_DURATION)

    return (
      <React.Fragment>
        {showChild && showLoadingScreen && <AppLoadingScreen transition />}
        {showChild ? children : <AppLoadingScreen />}
      </React.Fragment>
    )
  }
}
