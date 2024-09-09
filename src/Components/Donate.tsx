import React from 'react'

export default function Donate({icon, title, content}) {
  return (
    <div className='bg-white w-[500px] h-[300px] p-8 flex flex-row overflow-hidden'>
      
        <div className='w-60'> 
            <img src={icon} alt="Donate icon" />
        </div>
        <div className='h-auto'>
            <div>
            <h2 className="font-bold text-xl">{title}</h2>
            </div>
            <div>
            <p className="text-xl">{content}</p>
            </div>
        </div>
    </div>
  )
}


