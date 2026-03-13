import React from 'react'

interface ProfileProps{
  name: string;
  position: string;
  profile: string;
}

const Profile:React.FC<ProfileProps> = ({name, position, profile}) => {
  return (
    <div className='flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left'>
      <div className='w-40 sm:w-1/3 mb-4 sm:mb-0'>
        <img src={profile} alt="" className="w-full h-auto" />
      </div>
      <div className='flex flex-col sm:ml-5 flex-1'>
        <h2 className='font-semibold text-xl mb-2'>{name}</h2>
        <p className='text-base opacity-70'>
          {position}
        </p>
      </div>
    </div>
  )
}

export default Profile;