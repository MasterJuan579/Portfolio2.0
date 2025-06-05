import React, {useRef, useEffect} from 'react'
import Scene from './Scene'

import { OrbitControls, OrthographicCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'

const Experience = () => {
  const cameraRef = useRef();
  const pointerRef = useRef({x:0, y:0}); 

  useEffect(()=>{
    const onPointerMove = (e) =>{
      pointerRef.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.y = (e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", onPointerMove)

    return ()=> {
      window.removeEventListener("pointermove", onPointerMove)
    }
  })
  return (
    <Canvas>
          <OrthographicCamera
            ref={cameraRef}
            makeDefault
            position={[4.075775525239354, 5.646120137743827, 4.873920735709626]}
            rotation={[-0.5279566569510294, 0.632068993864664, 0.33181045691321]}
            zoom={63}
          />
          {/* <OrbitControls/> */}
        <Scene camera={cameraRef} pointerRef={pointerRef}/>
    </Canvas>
  )
}

export default Experience