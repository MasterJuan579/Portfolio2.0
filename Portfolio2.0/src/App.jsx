import { useState } from "react";
import "./App.css";
import Experience from "./Experience/Experience";
import LoadingScreen from "./Experience/components/LoadingScreen";
import Curtain from "./Experience/components/Curtain";
import Sidebar from "./Experience/components/Sidebar"; // 🆕 Importa el sidebar
import HamburgerMenu from "./Experience/components/HamburgerMenu"; // 🆕 Importa el sidebar

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCurtain, setShowCurtain] = useState(false);

  const handleLoadingFinish = () => {
    setIsLoading(false);
    setShowCurtain(true);
  };

  const handleCurtainFinish = () => {
    setShowCurtain(false);
  };

  return (
    <div className="relative h-screen w-screen">
      {/* Sidebar fijo a la izquierda */}
      <Sidebar />
      <HamburgerMenu />

      {/* Contenido principal con espacio para el sidebar */}
      <main className="ml-20 h-screen w-full">
        <Experience />
      </main>

      {/* Pantalla de carga inicial */}
      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}

      {/* Animación de cortina */}
      {showCurtain && <Curtain onFinish={handleCurtainFinish} />}
    </div>
  );
}

export default App;
