import React, {Suspense} from 'react'
import Room from "./models/Room74-v1"

function Scene() {
  return (
    <Suspense>
      <Room></Room>
    </Suspense>
  )
}

export default Scene