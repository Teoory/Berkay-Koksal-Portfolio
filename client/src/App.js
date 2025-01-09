import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './App.css';
import AppRouter from './Routes/AppRouter';
import Loading from "./Components/Loading";
import SnowEffect from "../src/Components/SnowEffect";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { t, i18n } = useTranslation();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  return (
    <div>
       {isLoading ? (
        <Loading onComplete={handleLoadingComplete} />
        ) : ( 
        <div className="App" style={{marginTop:'60px',overflow:'hidden'}}>
          <SnowEffect />
          <AppRouter />
        </div>
       )}
    </div>
  );
}

export default App;