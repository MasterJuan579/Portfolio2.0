import { useFrame } from "@react-three/fiber";
import React, { useMemo, useState, useRef } from "react";
import * as THREE from "three";

const Plane = ({ position, planeDepth, planeWidth }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "white",
      emissive: "white",
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0,
    });
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    const targetOpacity = hovered ? 0.8 : 0;
    const lerpfactor = hovered ? 0.1 : 0.03;
    setOpacity(THREE.MathUtils.lerp(opacity, targetOpacity, lerpfactor));
    meshRef.current.material.opacity = opacity;
    meshRef.current.material.emissiveIntensity = hovered ? 1.5 : 0.8;
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
      onPointerMove={() =>{
        setHovered(true)
      }}
      onPointerOut={() =>{
        setHovered(false)
      }}
    >
      <planeGeometry args={[planeDepth, planeWidth]} />
    </mesh>
  );
};

function GridPlanes({ rows, columns, planeWidth, planeDepth, spacing }) {
  const gridWidth = columns * (planeWidth + spacing) - spacing;
  const gridDepth = rows * (planeDepth + spacing) - spacing;

  const startX = planeWidth / 2 - gridWidth / 2;
  const startZ = planeDepth / 2 - gridDepth / 2;

  const planes = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = startX + column * (planeWidth + spacing);
      const z = startZ + row * (planeDepth + spacing);

      planes.push(
        <Plane
          key={`plane-${row}-${column}`}
          planeDepth={planeDepth}
          planeWidth={planeWidth}
          position={[x, -0.1, z]}
        ></Plane>
      );
    }
  }

  return <group>{planes}</group>;
}

export default GridPlanes;

