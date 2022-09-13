import { useEffect, useRef, useState } from 'react'
import { AppState } from 'react-native'

export default function useAppState() {
  const [isActive, setIsActive] = useState(true)
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      console.log(`app state transitioning from ${appState.current} to ${nextAppState}`)
      if (appState.current === 'active' && nextAppState === 'active') return

      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        console.log('App has come to the foreground')
        setIsActive(true)
      } else {
        console.log('App is in background')
        setIsActive(false)
      }

      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  })

  return { isActive }
}
