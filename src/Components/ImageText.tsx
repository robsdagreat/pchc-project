
const ImageText = ({img}) => {
  return (
    <div className='w-full sm:w-4/5 relative mb-20'>
      <div className="w-full h-0 pb-[75%] relative overflow-hidden">
        <img 
          src={img} 
          alt="Carousel Image" 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className='inset-x-0 mx-auto bg-white flex flex-col items-center p-5 w-5/6 rounded-xl shadow-lg -translate-y-1/4 z-10'>
        <h2 className='mb-4 text-xl sm:text-2xl font-semibold'>OUR MISSION</h2>
        <p className='text-sm sm:text-base opacity-60 text-center'>
          Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.
          Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic
        </p>
      </div>
    </div>
  )
}

export default ImageText
