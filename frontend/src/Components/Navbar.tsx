import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../assets/Logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState(location.hash || '');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    // Also update when location changes via router
    setCurrentHash(location.hash);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [location.hash]);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/#hero', label: 'Home' },
    { path: '/#about-us', label: 'About Us' },
    { path: '/#our-work', label: 'Our Work' },
    { path: '/#blogs', label: 'Blogs' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/#contact', label: 'Contact' },
  ];

  const transparentNavbar = isHome && !scrolled;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 h-20 transition-colors duration-300 z-50 font-sans ${transparentNavbar ? 'bg-transparent' : 'bg-white shadow-md'}`}>
        <div className="w-full mx-auto h-full px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 max-w-none">
          <nav className="flex items-center justify-between h-full">
            <div className="flex items-center h-full">
              <Link to="/" className="flex items-center gap-2">
                <img src={Logo} alt="Logo" className="h-12 w-auto object-contain" />
              </Link>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 lg:space-x-8 text-sm lg:text-[15px] font-medium">
              {navItems.map((item) => {
                const isActive = (location.pathname + currentHash) === item.path || 
                                (item.path === '/#hero' && currentHash === '' && location.pathname === '/');
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`${isActive ? 'text-green-500' : `${transparentNavbar ? 'text-gray-100' : 'text-gray-800'} hover:text-green-500`} transition-colors tracking-wide`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop Donate Button */}
            <div className="hidden md:block">
              <Link
                to="/donate"
                className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-7 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 tracking-wide text-[15px]"
              >
                Donate Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 flex items-center justify-center ${transparentNavbar ? 'text-white' : 'text-green-500'}`}
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
          <ul className="flex flex-col items-center py-6 space-y-6 text-lg text-gray-800">
            {navItems.map((item) => {
              const isActive = (location.pathname + currentHash) === item.path || 
                              (item.path === '/#hero' && currentHash === '' && location.pathname === '/');
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`${isActive ? 'text-green-500' : 'hover:text-green-500'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                to="/donate"
                className="inline-block border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Navbar;
