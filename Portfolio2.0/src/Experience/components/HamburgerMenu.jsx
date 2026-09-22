import React, { useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import { IoMenu, IoClose } from "react-icons/io5";
import logo from "../../assets/LOGO.PNG";
import { NAV_ITEMS } from "../../config/navigation";

const HamburgerMenu = ({ activeSection, onNavigate }) => {
  const isSmallScreen = useMediaPredicate("(max-width: 1023px)");
  const [open, setOpen] = useState(false);

  if (!isSmallScreen) return null;

  const handleSelect = (id) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* El logo es la via de regreso a home */}
      <div className="fixed top-4 left-4 z-50">
        <button type="button" onClick={() => handleSelect(null)} aria-label="Volver al inicio">
          <img src={logo} alt="Logo" className="w-12 h-auto" />
        </button>
      </div>

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          className="text-[color:var(--text)] text-3xl transition-transform duration-300 transform hover:scale-110"
        >
          {open ? (
            <IoClose className="transition-transform duration-300 rotate-90" />
          ) : (
            <IoMenu className="transition-transform duration-300 scale-100" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-[color:var(--surface)] backdrop-blur-lg z-40 transition-all duration-500 ease-in-out flex flex-col items-center ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="mt-32 flex flex-col gap-10 text-[color:var(--text)] text-2xl font-semibold items-center">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = activeSection === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => handleSelect(id)}
                aria-current={isActive ? "page" : undefined}
                className="group relative uppercase tracking-widest"
              >
                <span
                  className={`transition-colors duration-300 group-hover:text-[color:var(--accent)] ${
                    isActive ? "text-[color:var(--accent)]" : "text-[color:var(--text)]"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`absolute left-0 top-1/2 h-[2px] bg-[color:var(--accent)] group-hover:w-full transition-all duration-500 ease-in-out transform -translate-y-1/2 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                ></span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default HamburgerMenu;
