import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
import Logo from '../assets/Logo.png';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/#hero' },
    { name: 'About Us', path: '/#about-us' },
    { name: 'Our Work', path: '/#our-work' },
    { name: 'Blogs', path: '/#blogs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/#contact' },
    { name: 'Sign In', path: '/admin/login' },
  ];

  return (
    <footer className="snap-start scroll-mt-20 bg-gray-900 text-white pt-12 md:pt-20 pb-8 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 border-t-4 border-green-500 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Top Area: Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & About (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <div className="bg-white p-3 rounded-2xl mb-6 inline-block">
              <img src={Logo} alt="Pallotti Hope Centre Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              Creating a safe, nurturing environment for children with autism and intellectual disabilities. Empowering lives through education, care, and community awareness.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1">
                 <FaFacebookF size={18} />
              </a>
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1">   
                 <FaXTwitter size={18} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-1">   
                 <FaInstagram size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links (Span 3) */}
          <div className="lg:col-span-3 flex flex-col items-start mt-6 md:mt-0">
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-green-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center justify-start group font-medium tracking-wide w-full"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-green-500 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact Info (Span 5) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left mt-6 md:mt-0">
            <h3 className="text-xl font-bold mb-6 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-green-500 rounded-full"></span>
            </h3>
            <div className="space-y-6 w-full max-w-sm">
              <div className="flex flex-row items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-green-500 flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="pt-1">
                  <h4 className="text-white font-semibold mb-1">Location</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Kibilizi sector, Gisagara<br />South Province, Rwanda</p>
                </div>
              </div>

              <div className="flex flex-row items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-green-500 flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div className="pt-1">
                  <h4 className="text-white font-semibold mb-1">Phone</h4>
                  <p className="text-gray-400 text-sm">+(250) 79 4690 299</p>
                  <p className="text-gray-400 text-sm">+(250) 78 4644 014</p>
                </div>
              </div>

              <div className="flex flex-row items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-green-500 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div className="pt-1">
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  <p className="text-gray-400 text-sm break-all">pallottichildrenhopecentrerw@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Area: Copyright */}
        <div className="w-full pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center text-sm sm:text-base md:text-sm text-gray-500 gap-4 md:gap-0">
          <p className="text-left mb-2 md:mb-0">&copy; {new Date().getFullYear()} Pallotti Children Hope Centre. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6 w-full md:w-auto mt-2 md:mt-0">
            <Link to="/#hero" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/#hero" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;