import React, { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import RoomModel from './models/RoomModel'
import GridPlanes from './components/GridPlanes'
import { TRANSITION_DURATION } from '../config/transition'
import { THEMES, THEME_SWITCH_DURATION } from '../config/theme'

// Amplitud del parallax en radianes (~9 grados a cada lado).
const PARALLAX_AMPLITUDE = Math.PI * 0.05

// Media vuelta, no vuelta completa: el cuarto es una caja abierta y girar 360
// mostraria el reverso de las paredes, que no esta modelado.
const SPIN = Math.PI

// La camara es ortografica, asi que alejarse NO se hace moviendo la posicion
// (no hay perspectiva): se hace bajando el zoom.
//
// El zoom de home se adapta a la pantalla. El cuarto proyectado mide
// 8.53 x 6.65 unidades (medido sobre la geometria del modelo con la rotacion de
// la camara). Se usa el zoom mas grande que lo deja caber a lo ancho y a lo
// alto, con tope en 80: en escritorio queda igual que siempre y en celular se
// reduce hasta que el cuarto entra completo y centrado.
const ZOOM_MAX = 80
const ROOM_SCREEN_WIDTH = 8.53
const ROOM_SCREEN_HEIGHT = 6.65
// Cuanto de la pantalla ocupa el cuarto. 0.67 de alto es lo que ya ocupaba a
// zoom 80 en escritorio; 0.8 de ancho deja margen para el parallax en celular.
const FILL_WIDTH = 0.8
const FILL_HEIGHT = 0.67

const getHomeZoom = ({ width, height }) =>
  Math.min(
    ZOOM_MAX,
    (width * FILL_WIDTH) / ROOM_SCREEN_WIDTH,
    (height * FILL_HEIGHT) / ROOM_SCREEN_HEIGHT
  )

// Los demas zooms son proporcionales al de home, para que las animaciones se
// vean igual en cualquier pantalla.
// Alejarse hasta colapsar a un punto (0.2 a zoom 80). Tiene que ser > 0: la
// proyeccion ortografica divide entre el zoom.
const AWAY_RATIO = 0.2 / 80
// Zoom minimo a mitad del cambio de tema (22 a zoom 80): se ven los dos cuartos
// lado a lado durante el viaje.
const SWITCH_DIP_RATIO = 22 / 80

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// En ortografica el tamano aparente es proporcional al zoom: interpolar en
// escala logaritmica hace que alejarse y acercarse se perciba a velocidad
// constante. Nunca toca 0 porque multiplica por un factor siempre positivo.
const logLerp = (from, to, t) => from * Math.pow(to / from, t)

// Los dos cuartos y sus grids se cargan desde el principio: el de destino
// tiene que estar listo antes del primer cambio de modo.
Object.values(THEMES).forEach(({ model }) => useGLTF.preload(model))

const Scene = ({ pointerRef, phase, theme, switchFrom, onTransitionComplete }) => {
  const worldRef = useRef()
  const pivotRefs = { dark: useRef(), light: useRef() }
  const parallaxRef = useRef(0)

  const startTimeRef = useRef(0)
  const spinStartRef = useRef(0)
  const completedRef = useRef(false)

  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)

  const zoomHome = getHomeZoom(size)
  const zoomAway = zoomHome * AWAY_RATIO
  const zoomDip = zoomHome * SWITCH_DIP_RATIO

  const isSwitching = phase === 'switching'
  const isAnimating =
    phase === 'leaving' || phase === 'returning' || isSwitching

  // Durante el cambio de tema el que gira de vuelta a 0 es el cuarto de origen;
  // en las transiciones de seccion es el cuarto activo.
  const animatedPivotId = isSwitching ? switchFrom : theme

  useEffect(() => {
    if (!isAnimating) return

    startTimeRef.current = performance.now()
    completedRef.current = false
    // Arrancar desde la rotacion actual, no desde cero: si no, hay un salto
    // brusco justo al inicio, que es donde mas se nota.
    const pivot = pivotRefs[animatedPivotId].current
    spinStartRef.current = pivot ? pivot.rotation.y : 0
    // pivotRefs se recrea en cada render pero sus refs son estables.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating, phase, animatedPivotId])

  // Estado final canonico de cada fase estable. La red de seguridad de App
  // cambia la fase por reloj de pared aunque el motor 3D no haya alcanzado a
  // correr (pestana oculta, rAF estrangulado, equipo lento); sin este snap la
  // camara y los cuartos quedarian a medias para siempre. Cuando la animacion
  // si corre completa, esto es un no-op. Tambien coloca el cuarto correcto
  // cuando el tema cambia dentro de una seccion, sin animacion.
  useLayoutEffect(() => {
    if (isAnimating) return

    if (worldRef.current) worldRef.current.position.x = -THEMES[theme].offset

    for (const [id, ref] of Object.entries(pivotRefs)) {
      if (!ref.current) continue
      // En una seccion el cuarto activo queda "de espaldas" (media vuelta),
      // para que al volver a home deshaga el giro aunque el tema haya cambiado
      // mientras estaba oculto.
      ref.current.rotation.y = phase === 'section' && id === theme ? SPIN : 0
    }
    parallaxRef.current = 0

    camera.zoom = phase === 'section' ? zoomAway : zoomHome
    camera.updateProjectionMatrix()
    // Incluye zoomHome: al rotar el celular o cambiar el tamano de la ventana
    // el cuarto se vuelve a encuadrar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnimating, phase, theme, camera, zoomHome])

  useFrame(() => {
    const world = worldRef.current
    const pivot = pivotRefs[animatedPivotId].current
    if (!world || !pivot) return

    if (isAnimating) {
      // Progreso por reloj de pared, no acumulando delta: asi comparte reloj con
      // las transiciones CSS (si no, se desincronizan) y si la pestana estuvo
      // oculta la animacion se pone al corriente sola.
      const duration = isSwitching ? THEME_SWITCH_DURATION : TRANSITION_DURATION
      const elapsed = (performance.now() - startTimeRef.current) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeInOutCubic(progress)

      if (isSwitching) {
        // Deslizamiento del mundo de un cuarto al otro, con un zoom-out que
        // toca fondo a la mitad y regresa.
        world.position.x = THREE.MathUtils.lerp(
          -THEMES[switchFrom].offset,
          -THEMES[theme].offset,
          eased
        )
        camera.zoom = logLerp(zoomHome, zoomDip, Math.sin(Math.PI * eased))
        // El cuarto de origen suelta su parallax para no quedar ladeado.
        pivot.rotation.y = THREE.MathUtils.lerp(spinStartRef.current, 0, eased)
      } else {
        const from = spinStartRef.current
        const to = phase === 'leaving' ? from + SPIN : 0
        pivot.rotation.y = THREE.MathUtils.lerp(from, to, eased)

        camera.zoom =
          phase === 'leaving'
            ? logLerp(zoomHome, zoomAway, eased)
            : logLerp(zoomAway, zoomHome, eased)
      }

      // Mantener el parallax sincronizado para que retome sin saltos.
      parallaxRef.current = pivot.rotation.y
      camera.updateProjectionMatrix()

      if (progress >= 1 && !completedRef.current) {
        completedRef.current = true
        onTransitionComplete()
      }
      return
    }

    // En 'section' el 3D esta tapado por el overlay: no animamos nada.
    if (phase !== 'home') return

    const targetRotation = pointerRef.current.x * PARALLAX_AMPLITUDE
    parallaxRef.current = THREE.MathUtils.lerp(
      parallaxRef.current,
      targetRotation,
      0.1
    )
    pivot.rotation.y = parallaxRef.current
  })

  // Suspense va solo alrededor de cada modelo, no de todo el mundo: si envolviera
  // el mundo, en una carga en frio worldRef seguiria vacio cuando corre el snap
  // de arriba, el mundo se quedaria en x=0 y el cuarto claro quedaria fuera de
  // pantalla al recargar en modo claro.
  return (
    <group ref={worldRef}>
      {Object.entries(THEMES).map(([id, { model, gridMode, offset }]) => {
        const isActive = id === theme
        // El cuarto inactivo solo se dibuja durante el deslizamiento.
        const isVisible = isActive || (isSwitching && id === switchFrom)

        return (
          <group
            key={id}
            ref={pivotRefs[id]}
            position={[offset, 0, 0]}
            visible={isVisible}
          >
            <Suspense fallback={null}>
              <RoomModel url={model} />
            </Suspense>
            {/* Solo el grid activo existe: asi el inactivo no recibe raycasts. */}
            {isActive && (
              <GridPlanes
                rows={19}
                columns={19}
                planeWidth={4}
                planeDepth={4}
                spacing={0}
                mode={gridMode}
              />
            )}
          </group>
        )
      })}
    </group>
  )
}

export default Scene
