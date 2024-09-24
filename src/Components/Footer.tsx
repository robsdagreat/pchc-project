import { Link } from 'react-router-dom'
import Icon1 from '../assets/ic_outline-email.svg'
import Icon2 from '../assets/ion_location-outline.svg'
import Icon3 from '../assets/ic_round-phone.svg'
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='bg-custom-bg text-white py-10 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-lg font-semibold border-b-2 border-white pb-2 mb-4'>ABOUT US</h3>
            <p className='text-white text-opacity-60 mt-4'>
             We are a Non-governmental organisation whose aim is to
             create safe environment for children with severe and mild autism
             through educating the autistic children and also raising awareness of the society.
            </p>
            <div className='flex flex-row mt-6 space-x-4'>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                 <CiFacebook size={29} className="text-white hover:text-blue-500 cursor-pointer transition-colors duration-300" />
              </a>
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">   
              <FaXTwitter size={29} className="text-white hover:text-blue-400 cursor-pointer transition-colors duration-300" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">   
              <FaInstagram size={29} className="text-white hover:text-pink-500 cursor-pointer transition-colors duration-300" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className='text-lg font-semibold border-b-2 border-white pb-2 mb-4'>SITE LINKS</h3>
            <nav className='text-white text-opacity-60 flex flex-col space-y-2 mt-4'>
              <Link to="./" className="hover:text-white">Home</Link>
              <Link to="./about" className="hover:text-white">About Us</Link>
              <Link to="./contact" className="hover:text-white">Contact</Link>
              <Link to="./gallery" className="hover:text-white">Gallery</Link>
            </nav>
          </div>
          
          <div>
            <h3 className='text-lg font-semibold border-b-2 border-white pb-2 mb-4'>ADDRESS</h3>
            <div className='text-white text-opacity-60 mt-4 space-y-4'>
              <div className='flex items-start'>
                <img src={Icon2} alt="address-icon" className="w-5 h-5 mt-1 mr-3 flex-shrink-0" />
                <p>203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
              <div className='flex items-center'>
                <img src={Icon3} alt="phone-icon" className="w-5 h-5 mr-3 flex-shrink-0" />
                <p>+250 788 888 888</p>
              </div>
              <div className='flex items-center'>
                <img src={Icon1} alt="mail-icon" className="w-5 h-5 mr-3 flex-shrink-0" />
                <p>info@pallottichildrenhope.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-center text-white text-opacity-60 mt-10'>
        <p>&copy; {new Date().getFullYear()} Pallotti Children Hope Centre. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer