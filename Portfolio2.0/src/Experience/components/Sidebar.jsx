import React from "react";
import { useMediaPredicate } from "react-media-hook";
import logo from "../../assets/LOGO.PNG";
import { NAV_ITEMS } from "../../config/navigation";

const Sidebar = ({ activeSection, onNavigate }) => {
  const isLargeScreen = useMediaPredicate("(min-width: 1024px)");

  if (!isLargeScreen) return null;

  return (
    <aside className="fixed left-10 top-4 h-[90vh] w-20 bg-[color:var(--surface)] text-[color:var(--text)] px-2 py-6 z-50 rounded-xl backdrop-blur-sm shadow-lg flex flex-col items-center transition-colors duration-[1600ms]">
      {/* El logo es la via de regreso a home */}
      <button
        type="button"
        onClick={() => onNavigate(null)}
        aria-label="Volver al inicio"
        className="mb-8 transition-transform duration-300 hover:scale-105"
      >
        <img src={logo} alt="Logo" className="w-12" />
      </button>

      <nav className="flex flex-col justify-between flex-1 items-center py-4">
        {NAV_ITEMS.map(({ id, label }) => {
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              aria-current={isActive ? "page" : undefined}
              className="rotate-[-90deg] text-xs tracking-[0.3em] uppercase font-medium relative cursor-pointer group my-5 transition-all duration-300"
            >
              <span
                className={`relative transition-colors duration-300 after:content-[''] after:absolute after:bottom-1.5 after:left-0 after:h-[2px] after:bg-[color:var(--accent)] after:transition-all after:duration-500 after:ease-in-out group-hover:text-[color:var(--accent)] group-hover:after:w-full ${
                  isActive ? "text-[color:var(--accent)] after:w-full" : "text-[color:var(--text)] after:w-0"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
