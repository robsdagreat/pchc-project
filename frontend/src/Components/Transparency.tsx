import { HOME_CONTENT } from '../constants/content';

const Transparency = () => {
  const { transparency } = HOME_CONTENT;

  return (
    <section className="w-full bg-[#FFFEFA] py-24 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
        
        {/* Left Side: Content */}
        <div className="flex-1 w-full lg:w-1/2">
          <div className="mb-8 relative inline-block">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
              {transparency.title.split(transparency.highlight)[0]}
              <span className="relative">
                {transparency.highlight}
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#f59e0b] rounded-full"></div>
              </span>
              {transparency.title.split(transparency.highlight)[1]}
            </h2>
          </div>
          
          <p className="font-outfit font-light text-gray-700 text-lg leading-relaxed mb-10 tracking-wide max-w-2xl">
            {transparency.description}
          </p>
          
          <ul className="space-y-5 mb-12">
            {transparency.points.map((point, idx) => (
              <li key={idx} className="flex items-center text-gray-800 font-outfit font-light text-[17px] tracking-wide">
                <div className="relative mr-4 flex-shrink-0">
                  <div className="w-6 h-6 rounded-full border-2 border-[#f59e0b] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                  </div>
                </div>
                {point}
              </li>
            ))}
          </ul>
          
          <button className="bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 font-bold py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-200/50 text-[16px] tracking-wide">
            {transparency.ctaText}
          </button>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 w-full lg:w-1/2 flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-[550px]">
            <div className="absolute -inset-4 bg-orange-100/30 rounded-3xl blur-2xl -z-10 animate-pulse"></div>
            <img 
              src={transparency.image} 
              alt="Transparency and Trust" 
              className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-2xl border-4 border-white"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Transparency;
