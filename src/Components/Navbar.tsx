import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.png'


const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About us' },
    { path: '/contact', label: 'Contact' },
    { path: '/gallery', label: 'Gallery' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md z-50">
        <div className="container mx-auto h-full px-4">
          <nav className="flex items-center justify-between h-full">
            <div className="flex items-center h-full">
              <img 
                className="h-12 w-auto object-contain" 
                src={Logo}
                alt="Pallotti children hope logo" 
              />
            </div>
            
            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8 text-lg text-nav-txt">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`${location.pathname === item.path ? 'font-bold border-b-4 border-active pb-2' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 flex items-center justify-center" 
              onClick={toggleMenu}
              style={{ height: '48px', width: '48px' }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-20 left-0 right-0 bg-white shadow-md z-40 md:hidden">
          <ul className="flex flex-col items-center py-4 space-y-4 text-lg text-nav-txt">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${location.pathname === item.path ? 'font-bold border-b-4 border-active pb-2' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;