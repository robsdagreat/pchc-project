interface ImageTprops{
  img: string;
  head:string;
  message:string;
}
const ImageText:React.FC<ImageTprops> = ({img,head,message}) => {
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
        <h2 className='mb-4 text-xl sm:text-2xl font-semibold'>{head}</h2>
        <p className='text-sm sm:text-base opacity-60 text-center'>
          {message}
        </p>
      </div>
    </div>
  )
}

export default ImageText
