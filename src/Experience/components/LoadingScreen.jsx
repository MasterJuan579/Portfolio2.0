import React, { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import './LoadingScreen.css'

const MIN_DURATION = 2500 // en ms

const LoadingScreen = ({ onFinish }) => {
  const { progress } = useProgress()
  const [startTime] = useState(Date.now())
  const [fadeOut, setFadeOut] = useState(false)
  const [hideBar, setHideBar] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (progress >= 100) {
      const elapsed = Date.now() - startTime
      const delay = Math.max(MIN_DURATION - elapsed, 0)

      setTimeout(() => setFadeOut(true), delay + 300)           // fade out empieza
      setTimeout(() => setHideBar(true), delay + 1200)          // barra se oculta
      setTimeout(() => setShowWelcome(true), delay + 1400)      // welcome entra
      setTimeout(() => {
        setDone(true)
        onFinish()
      }, delay + 2800)
    }
  }, [progress, startTime, onFinish])

  if (done) return null

  return (
    <div className="loading-container">
      {!hideBar && (
        <div className={fadeOut ? "fade-out" : ""}>
          <div className="full-width-bar">
            <div
              className="full-width-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="percent-centered">{Math.floor(progress)}%</div>
        </div>
      )}
      {showWelcome && <div className="loading-welcome">Welcome</div>}
    </div>
  )
}

export default LoadingScreen
