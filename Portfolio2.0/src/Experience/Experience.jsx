import React, { useRef, useEffect } from 'react'
import Scene from './Scene'
import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const Experience = () => {
  const cameraRef = useRef()
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onPointerMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('pointermove', onPointerMove)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[4.075775525239354, 5.646120137743827, 4.873920735709626]}
        rotation={[-0.5279566569510294, 0.632068993864664, 0.33181045691321]}
        zoom={80}
      />
      <Scene camera={cameraRef} pointerRef={pointerRef} />
    </Canvas>
  )
}

export default Experience
