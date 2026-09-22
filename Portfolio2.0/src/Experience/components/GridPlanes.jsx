// GridPlanes.jsx
import { useFrame } from "@react-three/fiber";
import React, { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

// Dos modos con el mismo mecanismo de intensidad por instancia:
// - glow (modo oscuro): AdditiveBlending, suma blanco al piso. Intensidad 0 no
//   suma nada, asi que el plano en reposo es invisible.
// - shadow (modo claro): SubtractiveBlending, que three resuelve como
//   destino * (1 - color), asi que oscurece el piso hacia negro. Intensidad 0
//   lo deja igual.
const MODES = {
  glow: { blending: THREE.AdditiveBlending, max: 0.8 },
  shadow: { blending: THREE.SubtractiveBlending, max: 0.9 },
};
const FADE_IN = 0.1;
const FADE_OUT = 0.03;
// Debajo de este valor el plano ya no se distingue del fondo y sale de la
// lista de activos, para que el bucle por frame quede vacio cuando nadie pasa el mouse.
const EPSILON = 0.002;
// Justo encima de la base del cuarto (Plane.002 queda en -0.14 * 0.7 = -0.098).
// Si el grid queda debajo, el raycast lo sigue encontrando pero la base lo tapa
// al dibujar y el hover no se ve.
const GRID_HEIGHT = -0.09;

// Objetos de trabajo reutilizados: crearlos dentro del bucle generaria basura cada frame.
const scratchMatrix = new THREE.Matrix4();
const scratchPosition = new THREE.Vector3();
const scratchQuaternion = new THREE.Quaternion();
const scratchScale = new THREE.Vector3(1, 1, 1);
const scratchColor = new THREE.Color();

function GridPlanes({
  rows,
  columns,
  planeWidth,
  planeDepth,
  spacing,
  position = [0, 0, 0],
  mode = "glow",
}) {
  const { blending, max: maxIntensity } = MODES[mode];
  const meshRef = useRef();
  const count = rows * columns;

  const intensities = useMemo(() => new Float32Array(count), [count]);
  // Solo los indices que siguen animando. Casi siempre tiene 0 o 2 elementos.
  const activeRef = useRef(new Set());
  const hoveredRef = useRef(-1);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const gridWidth = columns * (planeWidth + spacing) - spacing;
    const gridDepth = rows * (planeDepth + spacing) - spacing;
    const startX = planeWidth / 2 - gridWidth / 2;
    const startZ = planeDepth / 2 - gridDepth / 2;

    // La rotacion que antes tenia cada mesh ahora va horneada en la matriz de instancia.
    scratchQuaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
    scratchColor.setScalar(0);

    let i = 0;
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        scratchPosition.set(
          startX + column * (planeWidth + spacing),
          GRID_HEIGHT,
          startZ + row * (planeDepth + spacing)
        );
        scratchMatrix.compose(scratchPosition, scratchQuaternion, scratchScale);
        mesh.setMatrixAt(i, scratchMatrix);
        // La primera llamada a setColorAt es la que crea el buffer instanceColor.
        mesh.setColorAt(i, scratchColor);
        i++;
      }
    }

    intensities.fill(0);
    activeRef.current.clear();
    hoveredRef.current = -1;

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
  }, [rows, columns, planeWidth, planeDepth, spacing, intensities]);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh || !mesh.instanceColor) return;

    const active = activeRef.current;
    if (active.size === 0) return;

    const hovered = hoveredRef.current;

    for (const index of active) {
      const target = index === hovered ? 1 : 0;
      const value = THREE.MathUtils.lerp(
        intensities[index],
        target,
        target === 1 ? FADE_IN : FADE_OUT
      );

      if (target === 0 && value < EPSILON) {
        intensities[index] = 0;
        scratchColor.setScalar(0);
        active.delete(index);
      } else {
        intensities[index] = value;
        scratchColor.setScalar(value * maxIntensity);
      }

      mesh.setColorAt(index, scratchColor);
    }

    mesh.instanceColor.needsUpdate = true;
  });

  const handlePointerMove = (event) => {
    const index = event.instanceId;
    if (index === undefined || index === hoveredRef.current) return;
    hoveredRef.current = index;
    activeRef.current.add(index);
  };

  const handlePointerOut = () => {
    // El plano que se deja atras sigue en activos para poder desvanecerse.
    hoveredRef.current = -1;
  };

  // Con el dedo no existe un 'hover' que siga despues de soltar: al levantarlo
  // el cuadro se desvanece. No se deja en manos del pointerleave, que cada
  // navegador dispara distinto para punteros tactiles.
  const handlePointerRelease = (event) => {
    if (event.pointerType !== "mouse") handlePointerOut();
  };

  return (
    <instancedMesh
      key={count}
      ref={meshRef}
      args={[undefined, undefined, count]}
      position={position}
      onPointerMove={handlePointerMove}
      // En pantallas tactiles un toque sin arrastrar tambien ilumina el cuadro.
      onPointerDown={handlePointerMove}
      onPointerUp={handlePointerRelease}
      onPointerCancel={handlePointerRelease}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry args={[planeDepth, planeWidth]} />
      <meshBasicMaterial
        color="white"
        transparent
        depthWrite={false}
        blending={blending}
      />
    </instancedMesh>
  );
}

export default GridPlanes;
