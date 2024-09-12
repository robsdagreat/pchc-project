import React from 'react'
import Prof from '../assets/profile.png'

const Profile = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left'>
      <div className='w-40 sm:w-1/3 mb-4 sm:mb-0'>
        <img src={Prof} alt="" className="w-full h-auto" />
      </div>
      <div className='flex flex-col sm:ml-5 flex-1'>
        <h2 className='font-semibold text-xl mb-2'>Dr. Bernd Bierbum</h2>
        <p className='text-base opacity-70'>
          Even the all-powerful Pointing has no control about the 
          blind texts it is an almost unorthographic.
          Even the all-powerful
        </p>
      </div>
    </div>
  )
}

export default Profile;