import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { CircleUser } from 'lucide-react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ mode, togglemode }) => {
  const [isLogin, setLogin] = useState(true);
  const [profilePic, setProfilePic] = useState('/default-user.webp');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useLogout();

  useEffect(() => {
    const authCred = localStorage.getItem("auth-cred");
    if (authCred) {
      try {
        const authData = JSON.parse(authCred);
        if (authData?.profilePic) {
          setProfilePic(authData.profilePic);
          setLogin(false);
        }
      } catch (error) {
        console.error("Error parsing auth-cred:", error);
      }
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setLogin(true);
  };

  const navLinkStyle = `btn btn-ghost text-lg tracking-wide font-ancient ${mode ? 'text-gray-400' : 'text-gray-800'}`;
  const dropdownMenuStyle = `menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ${mode ? 'text-gray-400 bg-gray-900' : 'text-gray-800 bg-gray-200'}`;

  return (
    <div className={`navbar fixed z-50 bg-base-100 ${mode ? 'text-gray-400 bg-gray-900' : 'text-gray-800 bg-gray-200'}`}>
      <div className="flex-1">
        <Link to="/" className={`text-xl font-ancient ${mode ? 'text-gold' : 'text-yellow-900'}`}>AncientFuture</Link>
      </div>

      {/* Hamburger icon for mobile */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:flex gap-3 items-center">
        <Link to="/learn" className={navLinkStyle}>Learn More</Link>
        <Link to="/tryar" className={navLinkStyle}>Try AR</Link>

        {/* Theme Toggle */}
        <label className="swap swap-rotate">
          <input type="checkbox" onChange={togglemode} />
          <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            {/* sun icon */}
            <path d="..." />
          </svg>
          <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            {/* moon icon */}
            <path d="..." />
          </svg>
        </label>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {profilePic === '/default-user.webp'
                ? <CircleUser size={36} className="w-full mt-[3px] text-gray-400" />
                : <img src={profilePic} alt="Profile" className="w-full object-cover" />}
            </div>
          </div>

          <ul tabIndex={0} className={dropdownMenuStyle}>
            {!isLogin ? (
              <>
                <li>
                  <Link to="/profile">Profile <span className="badge">New</span></Link>
                </li>
                <li><a>Settings</a></li>
                <li onClick={handleLogout}><Link to="/">Logout</Link></li>
              </>
            ) : (
              <li><a>Help</a></li>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Menu (only shows when open) */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full flex flex-col items-start bg-base-100 p-4 shadow-md md:hidden gap-3">
          <Link to="/learn" className={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Learn More</Link>
          <Link to="/tryar" className={navLinkStyle} onClick={() => setMobileMenuOpen(false)}>Try AR</Link>

          <label className="swap swap-rotate">
            <input type="checkbox" onChange={togglemode} />
            <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="..." /></svg>
            <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="..." /></svg>
          </label>

          <div className="flex gap-2 items-center">
            <div className="w-10 rounded-full">
              {profilePic === '/default-user.webp'
                ? <CircleUser size={36} className="text-gray-400" />
                : <img src={profilePic} alt="Profile" className="w-full object-cover rounded-full" />}
            </div>
            {!isLogin ? (
              <div className="flex flex-col">
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                <Link to="/" onClick={handleLogout}>Logout</Link>
              </div>
            ) : (
              <Link to="/help">Help</Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
