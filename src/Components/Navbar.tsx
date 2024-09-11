import React from 'react'
import Logo from '../assets/Logo.png'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
 const location = useLocation();
 
  return (
    <div className='h-20 fixed top-0 left-0 right-0 z-50 shadow-md bg-white'>
      <nav className='flex flex-row h-full items-center justify-between px-10'>
        <div>
          <img className='h-12' src={Logo} alt="Pallotti children hope logo" />
        </div>
        <ul className='flex flex-row gap-20 text-lg text-nav-txt'>
          <li><Link to="/" className={`${location.pathname==='/' ? 'font-bold border-b-4 border-active pb-2': ''}`}>Home</Link></li>
          <li><Link to="/about" className={`${location.pathname==='/about' ? 'font-bold border-b-4 border-active pb-2': ''}`}>About us</Link></li>
          <li><Link to="/contact" className={location.pathname==='/contact' ? 'font-bold border-b-4 border-active pb-2': ''}>Contact</Link></li>
          <li><Link to="/gallery" className={location.pathname==='/gallery' ? 'font-bold border-b-4 border-active pb-2': ''}>Gallery</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar