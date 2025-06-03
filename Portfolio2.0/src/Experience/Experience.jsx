import React from 'react'
import Scene from './Scene'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

function Experience() {
  return (
    <Canvas>
          <OrbitControls/>
        <Scene/>
    </Canvas>
  )
}

export default Experience