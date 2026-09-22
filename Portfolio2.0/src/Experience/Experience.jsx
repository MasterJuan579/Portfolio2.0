import React, { useRef, useEffect } from 'react'
import Scene from './Scene'
import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const Experience = ({ phase, theme, switchFrom, onTransitionComplete }) => {
  const cameraRef = useRef()
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onPointerMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    // En celular no hay cursor que se quede quieto en un lugar: al levantar el
    // dedo el parallax regresa al centro en vez de dejar el cuarto ladeado.
    const onPointerEnd = (e) => {
      if (e.pointerType !== 'mouse') pointerRef.current.x = 0
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerEnd)
    window.addEventListener('pointercancel', onPointerEnd)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerEnd)
      window.removeEventListener('pointercancel', onPointerEnd)
    }
  }, [])

  return (
    <Canvas
      // Los celulares tienen densidad 3x: renderizar a 2x se ve igual de nitido y
      // dibuja 2.25 veces menos pixeles.
      dpr={[1, 2]}
      style={{
        position: 'fixed',
        // inset en vez de 100vw/100vh: en iOS 100vh incluye la zona de la barra
        // del navegador y el cuarto quedaria descentrado hacia abajo.
        inset: 0,
        zIndex: 0,
        // Sin esto el navegador toma el arrastre del dedo como scroll/zoom,
        // cancela el puntero y el hover dejaria de seguir al dedo.
        touchAction: 'none',
      }}
    >
      {/* El zoom inicial lo reemplaza Scene segun el tamano de la pantalla.
          La camara esta 150 unidades atras sobre su propia direccion de vista
          (antes estaba en [4.08, 5.65, 4.87], a 8.5 del centro). En ortografica
          eso no cambia la imagen, pero la base mide 75 unidades: con zoom bajo
          (tablet, celular) se veia piso detras de la camara y el plano cercano
          lo cortaba en una linea horizontal en la parte baja de la pantalla. */}
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        position={[92.6981, 66.6128, 109.4165]}
        near={0.1}
        far={1000}
        rotation={[-0.5279566569510294, 0.632068993864664, 0.33181045691321]}
        zoom={80}
      />
      <Scene
        pointerRef={pointerRef}
        phase={phase}
        theme={theme}
        switchFrom={switchFrom}
        onTransitionComplete={onTransitionComplete}
      />
    </Canvas>
  )
}

export default Experience
