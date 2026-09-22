import { useLayoutEffect, useState } from 'react'
import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY } from '../config/theme'

// localStorage puede no existir o lanzar (modo privado, datos bloqueados):
// en ese caso simplemente no se recuerda la eleccion.
const readStoredTheme = () => {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return stored && THEMES[stored] ? stored : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export default function useTheme() {
  const [theme, setTheme] = useState(readStoredTheme)

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Sin almacenamiento disponible: el tema vale solo para esta visita.
    }
  }, [theme])

  return [theme, setTheme]
}
