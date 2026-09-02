import React, { Suspense, useRef } from 'react'
import * as THREE from 'three'
import Room from './models/RoomFinal3'
import { useFrame } from '@react-three/fiber'
import GridPlanes from './components/GridPlanes'

// Amplitud del parallax en radianes (~9 grados a cada lado).
const PARALLAX_AMPLITUDE = Math.PI * 0.05

const Scene = ({ pointerRef }) => {
  const groupRef = useRef()
  const groupRotationRef = useRef(0)

  useFrame(() => {
    if (!groupRef.current) return

    // Parallax horizontal: solo rotacion en Y a partir de pointer.x.
    const targetRotation = pointerRef.current.x * PARALLAX_AMPLITUDE

    groupRotationRef.current = THREE.MathUtils.lerp(
      groupRotationRef.current,
      targetRotation,
      0.1
    )

    groupRef.current.rotation.y = groupRotationRef.current
  })

  return (
    <Suspense>
      <group ref={groupRef}>
        <Room />
        <GridPlanes
          rows={20}
          columns={20}
          planeWidth={4}
          planeDepth={4}
          spacing={0}
        />
      </group>
    </Suspense>
  )
}

export default Scene
