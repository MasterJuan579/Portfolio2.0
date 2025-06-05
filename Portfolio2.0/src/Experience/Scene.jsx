import React, {Suspense, useRef} from 'react'
import Room from "./models/RoomFinal2"
import { useFrame } from '@react-three/fiber';

const Scene = ({camera, pointerRef})=> {

  const gruopRotationRef = useRef({})
  useFrame(()=>{
    // console.log(camera.current.position)
    // console.log(camera.current.rotation)

    const targetPosition = pointerRef.current.x * Math.PI * 0.5;

  });
  return (
    <Suspense>
      <Room></Room>
    </Suspense>
  )
}

export default Scene