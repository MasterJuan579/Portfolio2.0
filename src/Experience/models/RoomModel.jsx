import React, { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { convertirHorneadoABasic } from '../utils/ConvertToBasic'

// Escala original del cuarto (la misma que usaba RoomFinal3).
const ROOM_SCALE = 0.7

/**
 * Cuarto generico: sirve para cualquier modelo con iluminacion horneada.
 * En vez de mapear cada nodo a mano (como hacia RoomFinal3), recorre la escena
 * y reemplaza cada material por su version unlit. Cada material se convierte
 * una sola vez aunque lo compartan varias mallas.
 */
export default function RoomModel({ url, ...props }) {
  const { scene } = useGLTF(url)

  useMemo(() => {
    const convertidos = new Map()

    scene.traverse((child) => {
      if (!child.isMesh) return

      const convertir = (material) => {
        // Idempotente: en desarrollo StrictMode ejecuta este memo dos veces.
        if (material.userData.horneado) return material
        if (!convertidos.has(material)) {
          const basic = convertirHorneadoABasic(material)
          basic.userData.horneado = true
          convertidos.set(material, basic)
        }
        return convertidos.get(material)
      }

      child.material = Array.isArray(child.material)
        ? child.material.map(convertir)
        : convertir(child.material)
    })
  }, [scene])

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} scale={ROOM_SCALE} />
    </group>
  )
}
