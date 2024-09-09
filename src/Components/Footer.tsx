import React from 'react'
import { Link } from 'react-router-dom'
import Icon1 from '../assets/ic_outline-email.svg'
import Icon2 from '../assets/ion_location-outline.svg'
import Icon3 from '../assets/ic_round-phone.svg'



const Footer= ()=> {

  return (
    <div className='bg-custom-bg text h-96'>
      <div className='flex flex-row justify-around mt-10'>
         <div className='w-1/6'>
            <span className='text-white border-b-2 border-white pb-2'>ABOUT US</span>
            <div className='mt-10'>
            <p className='line-clamp-3 text-white text-opacity-60'>
              Far far away, behind the word mountains, 
              far from the countries Vokalia and Consonantia, 
              there live the blind texts.
            </p>
            </div>
         </div>
         <div >
            <span className='text-white border-b-2 border-white pb-2'>SITE LINKS</span>
             <div className='text-white text-opacity-60 flex flex-col mt-10'>
             <Link to="./">Home</Link>
            <Link to="./about">About Us</Link>
            <Link to="./contact">Contact</Link>
            <Link to="./gallery">Gallery</Link>
             </div>
         </div>
         <div className='text-white'>
            <span className='text-white border-b-2 border-white pb-2'>ADDRESS</span>
            <div className='mt-10 text-white text-opacity-60'>
                <div className='flex flex-row'>
                    <img src={Icon2} alt="address-icon" />
                    <p className='ml-3'>203 Fake St. Mountain View, San Francisco, California, USA</p>
                </div>
                <div className='flex flex-row mt-5'>
                    <img src={Icon3} alt="phone-icon" />
                    <p className='ml-3'>+250 788 888 888</p>
                </div>
                <div className='flex flex-row mt-5'>
                    <img src={Icon1} alt="mail-icon" />
                    <p className='ml-3'>info@pallottichildrenhope.com</p>
                </div>
            </div>
         </div>
      </div>
      <div className='text-center text-white py-10'>
            <p>&copy; {new Date().getFullYear()} Pallotti Children Hope Centre. All rights reserved.</p>
         </div>
    </div>
  )
}

export default Footer