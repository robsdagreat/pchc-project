
const Mission = ({content,section}) => {
  return (
    <div className='flex flex-col items-center w-full sm:w-3/4 lg:w-1/2 mx-auto mb-20 p-4 sm:p-10'>
      <h2 className='mb-6 text-xl sm:text-2xl font-semibold text-center'>{section}</h2>
      <p className='text-sm sm:text-base text-center'>
        {content}
      </p>
    </div>
  )
}

export default Mission;