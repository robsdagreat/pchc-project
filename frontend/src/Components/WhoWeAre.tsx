import ImgArr from '../assets/Utils/ImageCarousel';

const WhoWeAre = () => {
  return (
    <section className="w-full bg-[#FCF8F2] py-10 md:py-12 lg:py-0 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 scroll-mt-24">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-12">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="mb-4 relative inline-block">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-1 tracking-tight">Who We <span className="text-green-500">Are</span></h2>
            {/* Orange Squiggly Underline SVG */}
            <svg 
              className="w-full max-w-[140px] md:max-w-[200px] h-auto text-green-500 -mt-1 md:-mt-2 mx-auto md:mx-0" 
              viewBox="0 0 200 20" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M4 14C35 4 75 -2 110 8C145 18 175 16 196 6" 
                stroke="currentColor" 
                strokeWidth="5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <p className="font-outfit font-light text-gray-700 text-sm sm:text-[15px] md:text-base xl:text-lg leading-relaxed mb-6 tracking-wide max-w-lg md:max-w-none">
            We are a non-profit organization dedicated to uplifting vulnerable communities
            through impactful programs focused on education, health, hunger relief, and women
            empowerment. Since our inception, we have helped thousands of individuals gain
            access to opportunities that transform their lives. Our mission is to create long-term,
            sustainable change by addressing the root causes of poverty and inequality.
          </p>
          
          <ul className="space-y-3 mb-8 text-left inline-block">
            {[
              "10+ years of community service",
              "50,000+ lives impacted",
              "Transparent use of donations",
              "Grassroots volunteers working on the ground"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center text-gray-800 font-outfit font-light text-sm sm:text-[15px] tracking-wide">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-green-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5"/>
                  <circle cx="12" cy="12" r="3" fill="currentColor"/>
                </svg>
                {item}
              </li>
            ))}
          </ul>
          
          <button className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-center text-[15px] tracking-wide inline-block w-full sm:w-auto">
            Learn More About Us
          </button>
        </div>
        
        {/* Right Side: Image with Frame */}
        <div className="flex-1 w-full md:w-1/2 flex justify-center md:justify-end relative mt-8 md:mt-0">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px]">
            {/* Green Border Frame */}
            <div className="absolute top-2 -right-2 md:top-4 md:-right-4 w-full h-full border-[3px] border-green-500 rounded-2xl z-0"></div>
            
            {/* Image */}
            <img 
              src={ImgArr[0]} 
              alt="Smiling Children" 
              className="relative z-10 w-full h-auto object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default WhoWeAre;
