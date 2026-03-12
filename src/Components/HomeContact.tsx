import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';
import CaringImg from '../assets/caring_contact.png';

const HomeContact = () => {
  return (
    <section className="w-full relative py-12 md:py-16 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#FCF8F2] pb-16 lg:pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-2 md:px-6">
        <div className="max-w-6xl mx-auto relative group">
          {/* Main Card */}
          <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 relative z-10">
            
            {/* Left Side: Form */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-gray-100">
              <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-1 lg:mb-2">Get In Touch</h2>
              <p className="text-gray-500 mb-6 lg:mb-8 text-sm sm:text-base">We are here for you! How can we help?</p>
              
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Enter your name" 
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-gray-700 placeholder-gray-400 outline-none text-sm sm:text-base"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-gray-700 placeholder-gray-400 outline-none text-sm sm:text-base"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Go ahead, we are listening..." 
                    rows={4}
                    className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-3 px-5 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all text-gray-700 placeholder-gray-400 resize-none outline-none text-sm sm:text-base"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 pt-3.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02] text-center text-sm sm:text-[15px] uppercase tracking-widest mt-2"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Right Side: Info & Image */}
            <div className="flex-1 p-6 sm:p-8 lg:p-10 bg-gray-50/10 flex flex-col items-center lg:items-start pb-12 lg:pb-10">
              {/* Top area with caring imagery */}
              <div className="relative mb-8 w-full">
                <div className="w-full h-40 sm:h-56 md:h-64 lg:h-48 rounded-2xl overflow-hidden shadow-lg bg-white p-1.5">
                  <img 
                    src={CaringImg} 
                    alt="Caring and Connection" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                {/* Stylized background shape */}
                <div className="absolute -top-4 -right-4 w-16 h-16 md:w-20 md:h-20 bg-green-500/10 rounded-full blur-2xl -z-10"></div>
              </div>

              {/* Contact Details */}
              <div className="space-y-5 w-full max-w-sm lg:pr-8">
                <div className="flex items-center gap-5 group cursor-default">
                  <div className="w-12 h-12 flex-shrink-0 bg-white shadow-md rounded-xl flex items-center justify-center text-green-600 border border-green-50 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-0.5">Address</span>
                    <span className="text-gray-700 font-semibold text-sm sm:text-base leading-tight">674 Washington Avenue, Kimisagara</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 group cursor-default">
                  <div className="w-12 h-12 flex-shrink-0 bg-white shadow-md rounded-xl flex items-center justify-center text-green-600 border border-green-50 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-0.5">Phone</span>
                    <span className="text-gray-700 font-semibold text-sm sm:text-base leading-tight">+250 788 123 456</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-5 group cursor-default">
                  <div className="w-12 h-12 flex-shrink-0 bg-white shadow-md rounded-full flex items-center justify-center text-green-600 border border-green-50 group-hover:bg-green-600 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-0.5">Email</span>
                    <span className="text-gray-700 font-semibold text-sm sm:text-base leading-tight break-all sm:break-normal">info@pallottihopecentre.org</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Floating Sidebar - Arranged horizontally on mobile, vertically on desktop */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 flex flex-row lg:flex-col gap-6 lg:gap-4 bg-green-600 py-3.5 px-8 lg:py-6 lg:px-3.5 rounded-[2rem] shadow-[0_10px_30px_rgba(22,163,74,0.3)] border-[4px] lg:border-[5px] border-white z-20 transition-transform duration-500 hover:scale-105 lg:top-1/2 lg:left-auto lg:right-0 lg:-translate-y-1/2 lg:translate-x-1/2">
            <a href="#" className="text-white hover:text-green-100 transition-all transform hover:scale-125 focus:outline-none">
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </a>
            <a href="#" className="text-white hover:text-green-100 transition-all transform hover:scale-125 focus:outline-none">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </a>
            <a href="#" className="text-white hover:text-green-100 transition-all transform hover:scale-125 focus:outline-none">
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
