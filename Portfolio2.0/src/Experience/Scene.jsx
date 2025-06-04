import React, {Suspense} from 'react'
import Room from "./models/RoomFinal2"

function Scene() {
  return (
    <Suspense>
      <Room></Room>
    </Suspense>
  )
}

export default Scene