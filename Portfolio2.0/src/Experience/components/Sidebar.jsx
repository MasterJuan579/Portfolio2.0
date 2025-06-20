import React from "react";
import { useMediaPredicate } from "react-media-hook";
import logo from "../../assets/LOGO.PNG";

const navItems = ["About", "Projects", "Experience", "Contact"];

const Sidebar = () => {
  const isLargeScreen = useMediaPredicate("(min-width: 1024px)");

  if (!isLargeScreen) return null;

  return (
    <aside className="fixed left-10 top-4 h-[90vh] w-20 bg-black/50 text-white px-2 py-6 z-50 rounded-xl backdrop-blur-sm shadow-lg flex flex-col items-center">
      {/* Logo */}
      <div className="mb-8">
        <img src={logo} alt="Logo" className="w-12" />
      </div>

      {/* Navegación */}
      <nav className="flex flex-col justify-between flex-1 items-center py-4">
        {navItems.map((item, i) => (
          <span
            key={i}
            className="rotate-[-90deg] text-xs tracking-[0.3em] uppercase font-medium relative cursor-pointer group my-5 transition-all duration-300"
          >
            <span className="relative text-white group-hover:text-cyan-400 transition-colors duration-300 after:content-[''] after:absolute after:bottom-1.5 after:left-0 after:w-0 group-hover:after:w-full after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-500 after:ease-in-out">
              {item}
            </span>
          </span>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

