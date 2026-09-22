import { useEffect, useState } from 'react'
import './Curtain.css'

const Curtain = ({ onFinish }) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Inicia la animación de apertura
    setTimeout(() => {
      setOpen(true)
    }, 100)

    // Espera a que termine la animación para desmontarse
    setTimeout(() => {
      onFinish()
    }, 1800) // debe coincidir con la duración del CSS
  }, [onFinish])

  return (
    <div className="curtain-wrapper">
      <div className={`curtain left ${open ? 'open' : ''}`}></div>
      <div className={`curtain right ${open ? 'open' : ''}`}></div>
    </div>
  )
}

export default Curtain
