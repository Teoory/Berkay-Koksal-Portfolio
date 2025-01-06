import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';

import Home from '../Pages/Home';
import Code from '../Components/githubrepos';


const AppRouter = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <Routes>
        <Route path="*" element={<Home />} />        
        <Route path="/home" element={<Home />} />
        <Route path="/code" element={<Code />} />
        
    </Routes>
  )
}

export default AppRouter