import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Authway from './pages/Authway';
import Hoveranim from './components/Hoveranim';
import Frontpage from './components/Frontpage';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
import LearnSection from './components/LearnSection';


const App = () => {
  const [mode, setMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const darklightMode = () => {
    setMode(!mode);
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    localStorage.setItem('isLoggedIn', newLoginState);
  };
  const {authUser} = useAuthContext();
  
  return (
    <Router>
      <div>
        <Navbar togglemode={darklightMode} mode={mode} />
        <Routes>
          <Route path="/" element={ authUser ? <>   <Hoveranim />   <Frontpage mode={mode}/> </> : <Navigate to="/authway" /> } />
          <Route path="/authway" element={ !authUser ?  <Authway setlogin={toggleLogin} /> : <Navigate to="/" />}/>
          <Route path="/learn" element={<LearnSection/>} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />

        </Routes>
       <Toaster />
      </div>
    </Router>
  );
};

export default App;
