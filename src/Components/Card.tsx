import React from 'react'

const Card= ()=> {
  return (
    <div className= 'bg-active w-[500px] h-[300px] p-8 flex flex-col justify-center items-center overflow-hidden'>
        <div className='text-3xl font-semibol pb-5'>
        <h2 >Served Over</h2>
        </div>
        <div className='text-5xl font-bold pb-5'>
        <span>2,346</span>
        </div>
        <div className='text-xl pt-5'>
          <p>Children all over Rwanda</p>
        </div>

    </div>
  )
}

export default Card;