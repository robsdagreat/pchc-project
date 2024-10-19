import ImageCarousel from '../Components/ImageCarousel'
import ImgArr from '../assets/Utils/ImageCarousel'
import ContInfo from '../Components/ContInfo'
import ContactForm from '../Components/ContactForm'
import Location from '../assets/Location.png'

const Contact = () => {
  return (
    <div>
      <div className="w-full">
        <ImageCarousel
          images={ImgArr}
          introText="CONTACT US"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className='py-10 sm:py-20'>
          <ContInfo />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pb-10 sm:pb-20'>
          <div className='w-full max-w-md mx-auto'>
            <ContactForm />
          </div>
          <div className='w-full flex justify-center items-center md:-translate-y-[100px]'>
            <a
              href="https://maps.app.goo.gl/qsLQuSpBqhjmpFqbA"
              target="_blank"
              rel="noopener noreferrer"
              className='text-lg text-blue-600 hover:underline'
            >
              <img src={Location} alt="Location Pin image" className="max-w-full h-auto" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact