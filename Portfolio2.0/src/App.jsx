import { useState } from "react";
import "./App.css";
import Experience from "./Experience/Experience";
import LoadingScreen from "./Experience/components/LoadingScreen";
import Curtain from "./Experience/components/Curtain";

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
    <>
      {/* Siempre renderizamos Experience */}
      <Experience />

      {/* Primero carga pantalla */}
      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}

      {/* Luego aparece la cortina encima */}
      {showCurtain && <Curtain onFinish={handleCurtainFinish} />}
    </>
  );
}

export default App;
