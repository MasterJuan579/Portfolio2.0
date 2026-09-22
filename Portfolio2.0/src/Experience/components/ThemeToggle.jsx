import React from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

// En modo oscuro muestra el sol (el siguiente clic lleva a luz) y en claro la
// luna. Los dos iconos estan montados y se cruzan con giro y escala, para que
// el cambio de forma se vea animado en vez de saltar.
const ThemeToggle = ({ theme, onToggle, disabled }) => {
  const isDark = theme === "dark";

  const iconClass = (visible) =>
    `absolute inset-0 m-auto transition-all duration-500 ease-out ${
      visible ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
    }`;

  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={!isDark}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className="fixed top-4 right-16 lg:right-8 lg:top-6 z-50 h-10 w-10 rounded-full bg-[color:var(--surface)] backdrop-blur-sm text-[color:var(--text)] text-2xl shadow-lg transition-[transform,background-color,color] duration-300 hover:scale-110 hover:text-[color:var(--accent)] disabled:opacity-50 disabled:hover:scale-100"
    >
      <IoSunny className={iconClass(isDark)} />
      <IoMoon className={iconClass(!isDark)} />
    </button>
  );
};

export default ThemeToggle;
