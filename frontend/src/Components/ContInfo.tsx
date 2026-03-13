import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const ContInfo = () => {
  return (
    <div className='mx-4 sm:mx-10 md:mx-20'>
      <h2 className='mb-6 sm:mb-10 font-semibold text-xl sm:text-2xl text-center'>Contact Information</h2>
      <div className='flex flex-col sm:flex-row gap-8 sm:gap-20 md:gap-40 justify-center'>
        <ContactInfoItem
          title="Address"
          icon={<FaMapMarkerAlt className='text-xl text-gray-600 hover:text-blue-500 transition-colors duration-300 hover:scale-110' />}
          href="https://maps.app.goo.gl/qsLQuSpBqhjmpFqbA"
          text="Gisagara, Sothern province, Rwanda"
          className="text-blue-600"
        />
        <ContactInfoItem
          title="Phone"
          icon={<FaPhone className='text-xl text-gray-600 hover:text-green-500 transition-colors duration-300 hover:scale-110' />}
          href="tel:+250784644014"
          text="+250 784 64 40 14"
          className="text-green-600"
        />
        <ContactInfoItem
          title="Email"
          icon={<FaEnvelope className='text-xl text-gray-600 hover:text-red-500 transition-colors duration-300 hover:scale-110' />}
          href="mailto:pallottichildrenhopecentrerw@gmail.com"
          text="pallottichildrenhopecentrerw@gmail.com"
          className="text-red-600"
        />
      </div>
    </div>
  );
}

const ContactInfoItem = ({ title, icon, href, text, className }) => (
  <div className='text-center'>
    <h3 className='mb-2 font-medium'>{title}</h3>
    <div className='flex items-center justify-center gap-2'>
      {icon}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm sm:text-base ${className} hover:underline break-words`}
      >
        {text}
      </a>
    </div>
  </div>
)

export default ContInfo;