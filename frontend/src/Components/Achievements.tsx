import HandshakeImg from '../assets/transparency_handshake.png';

const Achievements = () => {
  const trustPoints = [
    "Annual reports available",
    "Regular impact updates",
    "Verified NGO activities",
    "Secure online donation process"
  ];

  return (
    <section className="w-full bg-[#333333] py-10 md:py-12 lg:py-0 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* Left Side: Content */}
        <div className="flex-1 w-full lg:w-3/5 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-4 relative inline-block">
            <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight leading-tight">
              Your <span className="relative inline-block">
                Trust
                <div className="absolute -bottom-1 left-0 w-full h-1 bg-green-500 rounded-full opacity-90"></div>
              </span> Matters to Us
            </h2>
          </div>
          
          <p className="font-outfit font-light text-gray-300 text-sm md:text-base xl:text-lg leading-relaxed mb-6 lg:mb-5 tracking-wide max-w-xl">
            We maintain complete transparency in how donations are utilized. Every contribution is tracked, audited, and directed toward the intended program.
          </p>
          
          <ul className="space-y-3 md:space-y-2.5 mb-8 lg:mb-7 inline-block text-left">
            {trustPoints.map((point, idx) => (
              <li key={idx} className="flex items-center text-white font-outfit font-light text-sm sm:text-[15px] tracking-wide">
                <div className="relative mr-3 flex-shrink-0">
                  <div className="w-4 h-4 md:w-4.5 md:h-4.5 rounded-full border-2 border-green-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  </div>
                </div>
                {point}
              </li>
            ))}
          </ul>
          
          <button className="w-full sm:w-auto border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 md:py-2 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-black/30 text-sm tracking-wide">
            View Donation Reports
          </button>
        </div>

        {/* Right Side: Image with adjusted scale */}
        <div className="flex-1 w-full lg:w-2/5 flex justify-center lg:justify-end relative mt-6 lg:mt-0">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px]">
             {/* Subtle Glow behind image */}
            <div className="absolute -inset-4 bg-green-500/5 rounded-[2.5rem] blur-2xl -z-10"></div>
             
            <img 
              src={HandshakeImg} 
              alt="Trust and Transparency" 
              className="relative z-10 w-full h-auto object-cover rounded-[1.5rem] shadow-2xl border border-white/5"
            />
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Achievements;
