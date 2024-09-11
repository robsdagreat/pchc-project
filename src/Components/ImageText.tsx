import React from 'react'


const ImageText = ({img})=> {
  return (
    <div className='w-4/5 relative left-2 mb-20'>
      <div className="w-full h-0 pb-[75%] relative overflow-hidden">
        <img 
          src={img} 
          alt="Carousel Image" 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className='inset-x-0 mx-auto bg-white flex flex-col items-center p-5 px- w-5/6 rounded-xl shadow-lg -translate-y-1/4 z-10'>
      <div className='mb-10 text-2xl'>
        <h2>OUR MISSION</h2>
      </div>
      <div>
        <p className='font-2xl opacity-60'>Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.
        Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic
        </p>
      </div>
      </div>
    </div>
  )
}

export default ImageText
