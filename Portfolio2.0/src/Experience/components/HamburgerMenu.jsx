import React, { useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import { IoMenu, IoClose } from "react-icons/io5";
import logo from "../../assets/LOGO.PNG";

const navItems = ["About", "Projects", "Experience", "Contact"];

const HamburgerMenu = () => {
  const isSmallScreen = useMediaPredicate("(max-width: 1023px)");
  const [open, setOpen] = useState(false);

  if (!isSmallScreen) return null;

  return (
    <>
      {/* Logo siempre visible */}
      <div className="fixed top-4 left-4 z-50">
        <img src={logo} alt="Logo" className="w-12 h-auto" />
      </div>

      {/* Botón hamburguesa con animación */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="text-white text-3xl transition-transform duration-300 transform hover:scale-110"
        >
          {open ? (
            <IoClose className="transition-transform duration-300 rotate-90" />
          ) : (
            <IoMenu className="transition-transform duration-300 scale-100" />
          )}
        </button>
      </div>

      {/* Menú fullscreen animado */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-lg z-40 transition-all duration-500 ease-in-out flex flex-col items-center ${
          open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="mt-32 flex flex-col gap-10 text-white text-2xl font-semibold items-center">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => setOpen(false)}
              className="group relative uppercase tracking-widest"
            >
              <span className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                {item}
              </span>
              <span className="absolute left-0 top-1/2 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-500 ease-in-out transform -translate-y-1/2"></span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default HamburgerMenu;
