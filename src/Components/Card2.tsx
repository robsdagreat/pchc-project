import React from 'react'

const Card2 = () => {
  return (
    <div className='bg-active2 w-[500px] h-[300px] p-8 flex flex-col justify-center items-center overflow-hidden'>
      <div className='text-3xl font-semibold pb-3'>
        <h2 className='opacity-70'>Be a volunteer</h2>
      </div>
      <div className='text-xl pb-3 text-center'>
        <span>"For where two or three are gathered in my name,
             I am there among them."  
             Mat 18:20
        </span>
      </div>
      <div className='text-xl pt-3 text-center'>
        <button className='bg-white p-3 px-7 rounded-md'>Be A Volunteer</button>
      </div>
    </div>
  )
}

export default Card2;