import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeroSlide {
  image: string;
  title: React.ReactNode;
  description: string;
}

interface HeroProps {
  slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Background Slides */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src={slide.image}
              alt={`Hero Background ${index + 1}`}
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
          </div>
        ))}
        {/* Professional Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10"></div>
      </div>

      <div className="relative z-20 text-left w-full flex flex-col items-start mt-20">
        <div className="transition-all duration-1000 ease-in-out w-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 absolute left-0 w-full px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 ${index === currentIndex
                ? 'opacity-100 translate-y-0 relative'
                : 'opacity-0 translate-y-4 pointer-events-none absolute'
                }`}
            >
              <h1 className="font-serif text-2xl md:text-4xl lg:text-[54px] font-bold text-[#fdedca] mb-6 leading-tight tracking-wide drop-shadow-xl">
                {slide.title}
              </h1>

              <p className="font-outfit text-white/90 text-base md:text-lg mb-12 max-w-[850px] font-light leading-relaxed tracking-wide drop-shadow-lg">
                {slide.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-start w-full sm:w-auto mt-4 sm:mt-8 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48">
          <Link
            to="/donate"
            className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 text-center text-[15px] tracking-wide"
          >
            Donate Now
          </Link>
          <Link
            to="/volunteer"
            className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 text-center text-[15px] tracking-wide"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-green-500' : 'w-4 bg-white/50 hover:bg-white'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div >
  );
};

export default Hero;
