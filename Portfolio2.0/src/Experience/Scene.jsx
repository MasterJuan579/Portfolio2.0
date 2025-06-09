import React, {Suspense, useRef} from 'react'
import * as THREE from 'three';
import Room from "./models/RoomFinal3"
import { useFrame } from '@react-three/fiber';
import GridPlanes from './components/GridPlanes';

const Scene = ({camera, pointerRef})=> {

  const groupRef =  useRef();
  const groupRotationRef = useRef(0);

  useFrame(()=>{
    if (!groupRef.current) return;
    // console.log(camera.current.position)
    // console.log(camera.current.rotation)

    const targetPosition = pointerRef.current.x * Math.PI * 0.05;

    groupRotationRef.current = THREE.MathUtils.lerp(
      groupRotationRef.current,
      targetPosition,
      0.1
    );

    groupRef.current.rotation.y = groupRotationRef.current;
  });
  return (
    <Suspense>
      <group ref={groupRef}>
        <Room />
        <GridPlanes 
          rows={20}
          columns={20} 
          planeWidth ={4} 
          planeDepth ={4} 
          spacing={0}/>
      </group>
    </Suspense>
  )
}

export default Scene