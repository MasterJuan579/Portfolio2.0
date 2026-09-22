// Lado de la base de los cuartos en unidades de mundo (Plane.002 mide +-53.87
// y el cuarto se escala a 0.7). Los cuartos se colocan a esta distancia para
// que las dos bases queden pegadas, sin hueco ni encimado.
export const ROOM_SPACING = 53.87 * 2 * 0.7

// Duracion del deslizamiento entre cuartos, en segundos.
export const THEME_SWITCH_DURATION = 1.6

export const DEFAULT_THEME = 'dark'
export const THEME_STORAGE_KEY = 'jp-theme'

// El cuarto oscuro queda fijo en el origen y el claro a +X. En la vista
// isometrica el eje X del mundo se ve en diagonal: de ahi el desplazamiento
// diagonal al cambiar de modo.
export const THEMES = {
  dark: {
    model: '/models/RoomDarkmode1-v1.glb',
    gridMode: 'glow',
    offset: 0,
  },
  light: {
    model: '/models/RoomLightmode1-v1.glb',
    gridMode: 'shadow',
    offset: ROOM_SPACING,
  },
}

export const nextTheme = (theme) => (theme === 'dark' ? 'light' : 'dark')
