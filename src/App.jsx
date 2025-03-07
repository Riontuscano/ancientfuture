import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Authway from './pages/Authway';
import Hoveranim from './components/Hoveranim';
import Frontpage from './components/Frontpage';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";
import LearnSection from './components/LearnSection';
import UserProfile from './components/ProfilePage';
import Footer from './components/Footer';
import SplashCursor from './components/CusorEffect';


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
      {/* <SplashCursor /> */}
        <Navbar togglemode={darklightMode} mode={mode} />
        <Routes>
          <Route path="/" element={ authUser ? <>   <Hoveranim />   <Frontpage mode={mode}/> </> : <Navigate to="/authway" /> } />
          <Route path='/profile' element={ authUser ?    <UserProfile mode={mode} />: <Navigate to="/authway" /> } />
          <Route path="/authway" element={ !authUser ?  <Authway setlogin={toggleLogin} /> : <Navigate to="/" />}/>
          <Route path="/learn" element={<LearnSection mode={mode}/>} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />

        </Routes>
       <Toaster />
        <Footer mode={mode} /> 
      </div>
    </Router>
  );
};

export default App;
