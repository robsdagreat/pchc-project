
const Card = () => {
  return (
    <div className='bg-active w-full sm:w-[300px] md:w-[400px] lg:w-[500px] h-auto sm:h-[250px] md:h-[300px] p-4 sm:p-8 flex flex-col justify-center items-center overflow-hidden text-center'>
      <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold pb-2 sm:pb-5'>Served Over</h2>
      <span className='text-3xl sm:text-4xl md:text-5xl font-bold pb-2 sm:pb-5'>2,346</span>
      <p className='text-base sm:text-lg md:text-xl pt-2 sm:pt-5'>Children all over Rwanda</p>
    </div>
  )
}

export default Card;