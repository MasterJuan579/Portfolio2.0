import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import Experience from "./Experience/Experience";
import LoadingScreen from "./Experience/components/LoadingScreen";
import Curtain from "./Experience/components/Curtain";
import Sidebar from "./Experience/components/Sidebar";
import HamburgerMenu from "./Experience/components/HamburgerMenu";
import ThemeToggle from "./Experience/components/ThemeToggle";
import SectionOverlay from "./sections/SectionOverlay";
import useTheme from "./hooks/useTheme";
import {
  TRANSITION_DURATION,
  TRANSITION_SAFETY_MARGIN,
} from "./config/transition";
import { THEME_SWITCH_DURATION, nextTheme } from "./config/theme";

/**
 * Fases de navegacion:
 *   home      - el cuarto en pantalla, con parallax por cursor
 *   leaving   - giro + alejamiento, corriendo hacia una seccion
 *   section   - una seccion visible, el 3D tapado y quieto
 *   returning - giro inverso + acercamiento, de vuelta a home
 *   switching - deslizamiento diagonal de un cuarto al otro al cambiar de modo
 *
 * La animacion completa solo corre al salir de home y al volver. Entre secciones
 * es un crossfade barato: cobrar 1.8s en cada clic se vuelve tedioso al tercero.
 */
const ANIMATED_PHASES = ["leaving", "returning", "switching"];

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCurtain, setShowCurtain] = useState(false);

  const [phase, setPhase] = useState("home");
  const [activeSection, setActiveSection] = useState(null);
  const pendingSectionRef = useRef(null);

  const [theme, setTheme] = useTheme();
  // Tema de origen del deslizamiento en curso.
  const [switchFrom, setSwitchFrom] = useState(theme);

  const isAnimating = ANIMATED_PHASES.includes(phase);

  const handleLoadingFinish = () => {
    setIsLoading(false);
    setShowCurtain(true);
  };

  const handleCurtainFinish = () => {
    setShowCurtain(false);
  };

  const handleNavigate = useCallback(
    (id) => {
      // Durante una transicion los clics se ignoran: dejar que se encimen
      // dejaria el giro a medias.
      if (isAnimating) return;

      if (id === null) {
        if (phase === "section") setPhase("returning");
        return;
      }

      if (id === activeSection) return;

      if (phase === "home") {
        pendingSectionRef.current = id;
        setPhase("leaving");
        return;
      }

      setActiveSection(id);
    },
    [phase, activeSection, isAnimating]
  );

  const handleToggleTheme = useCallback(() => {
    if (isAnimating) return;

    setSwitchFrom(theme);
    // El tema cambia al inicio del deslizamiento: el fondo y la UI hacen su
    // fade de colores durante el viaje, no al final.
    setTheme(nextTheme(theme));

    // Dentro de una seccion el cuarto esta oculto: el cambio es instantaneo y
    // solo se ven los colores. Con movimiento reducido, igual.
    if (phase === "home" && !prefersReducedMotion()) setPhase("switching");
  }, [isAnimating, phase, theme, setTheme]);

  // La llama el motor de transicion desde useFrame al llegar al 100%.
  const handleTransitionComplete = useCallback(() => {
    if (phase === "leaving") {
      setActiveSection(pendingSectionRef.current);
      setPhase("section");
    } else if (phase === "returning") {
      setActiveSection(null);
      setPhase("home");
    } else if (phase === "switching") {
      setPhase("home");
    }
  }, [phase]);

  // Red de seguridad: el motor 3D avisa desde useFrame, y requestAnimationFrame
  // se detiene si la pestana pasa a segundo plano. Sin esto, cambiar de pestana
  // a mitad de transicion dejaria la fase congelada y la navegacion muerta.
  useEffect(() => {
    if (!isAnimating) return undefined;

    const duration =
      phase === "switching" ? THEME_SWITCH_DURATION : TRANSITION_DURATION;
    const timeout = setTimeout(
      handleTransitionComplete,
      (duration + TRANSITION_SAFETY_MARGIN) * 1000
    );

    return () => clearTimeout(timeout);
  }, [phase, isAnimating, handleTransitionComplete]);

  // Durante 'leaving' la seccion todavia no esta activa, pero el overlay ya la
  // necesita montada para poder encimar su fade con el final del giro.
  const displayedSection =
    phase === "leaving" ? pendingSectionRef.current : activeSection;

  return (
    <div className="relative h-screen w-screen">
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
      <HamburgerMenu activeSection={activeSection} onNavigate={handleNavigate} />
      <ThemeToggle
        theme={theme}
        onToggle={handleToggleTheme}
        disabled={isAnimating}
      />

      <main className="h-screen w-full">
        <Experience
          phase={phase}
          theme={theme}
          switchFrom={switchFrom}
          onTransitionComplete={handleTransitionComplete}
        />
      </main>

      {displayedSection && (
        <SectionOverlay phase={phase} sectionId={displayedSection} />
      )}

      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}
      {showCurtain && <Curtain onFinish={handleCurtainFinish} />}
    </div>
  );
}

export default App;
