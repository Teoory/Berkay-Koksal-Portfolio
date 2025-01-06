import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import './App.css';
import Loading from "./Components/Loading";
import AppRouter from './Routes/AppRouter';

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
          <AppRouter />
        </div>
       )}
    </div>
  );
}

export default App;