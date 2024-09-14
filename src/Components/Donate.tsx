
export default function Donate({icon, title, content}) {
  return (
    <div className='bg-white w-full max-w-[500px] p-4 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-lg rounded-lg'>
      <div className='w-20 sm:w-1/4'> 
        <img src={icon} alt="Donate icon" className="w-full h-auto" />
      </div>
      <div className='flex-1 text-center sm:text-left'>
        <h2 className="font-bold text-lg sm:text-xl mb-2">{title}</h2>
        <p className="text-sm sm:text-base">{content}</p>
      </div>
    </div>
  )
}