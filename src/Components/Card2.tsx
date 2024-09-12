import React from 'react'
import { Link } from 'react-router-dom';

const Card2 = () => {
  return (
    <div className='bg-active2 w-full sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto sm:h-[250px] md:h-[300px] p-4 sm:p-8 flex flex-col justify-center items-center overflow-hidden text-center'>
      <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold pb-2 sm:pb-3 opacity-70'>Be a volunteer</h2>
      <span className='text-base sm:text-lg md:text-xl pb-2 sm:pb-3'>
        "For where two or three are gathered in my name,
        I am there among them."  
        Mat 18:20
      </span>
      <div className='pt-2 sm:pt-3 group'>
        <Link to={"./contact"}>
          <button className='bg-white p-2 sm:p-3 px-5 sm:px-7 rounded-md text-base sm:text-lg group-hover:opacity-80 group-hover:font-semibold transition-all duration-300'>
            Be A Volunteer
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Card2;