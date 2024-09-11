import React from 'react'
import Prof from '../assets/profile.png'

const Profile=()=> {
  return (
    <div className='flex flex-row'>
      <div className='w-60'>
        <img src={Prof} alt="" />
      </div>
      <div className='flex flex-col ml-5'>
        <div  className='font-semibold text-xl'>
            <h2>Dr. Bernd Bierbum</h2>
        </div>
        <div className='font-xl opacity-70 mt-2'>
            <p className='w-2/3'>
            Even the all-powerful Pointing has no control about the 
            blind texts it is an almost unorthographic.
            Even the all-powerful
            </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
