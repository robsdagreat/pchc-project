import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchData } from '../utils/api.js';
import VolunteerImg from '../assets/impact_volunteer.png';

const Impact = () => {
  const [content, setContent] = useState<any>(null);
  const [impacts, setImpacts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetchData('/content/homepage');
        const impactData = response.data.impact;
        
        if (impactData) {
          setContent(impactData);
          try {
            const parsedImpacts = JSON.parse(impactData.description);
            if (Array.isArray(parsedImpacts)) {
              setImpacts(parsedImpacts);
            }
          } catch (e) {
            console.error('Error parsing impact stats:', e);
            // Fallback to static labels if JSON parsing fails
            setImpacts([
              "20,000+ therapy and care sessions provided",
              "8,000+ children supported with medical and rehabilitation services",
              "5,000+ children empowered through specialized education programs",
              "300+ families supported with skills and guidance for independent living",
              "Inclusive community built to support children with special needs"
            ]);
          }
        }
      } catch (err) {
        console.error('Failed to load impact content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  // Helper to create the "curved" or "arc" arrangement from the photo
  const getStaggerClass = (index: number) => {
    switch (index % 5) {
      case 0: return 'ml-0 lg:ml-0';
      case 1: return 'ml-0 lg:ml-12';
      case 2: return 'ml-0 lg:ml-24';
      case 3: return 'ml-0 lg:ml-12';
      case 4: return 'ml-0 lg:ml-0';
      default: return '';
    }
  };

  if (loading) return null; // Or a smaller spinner if preferred

  return (
    <section className="w-full bg-[#FCF8F2] py-10 md:py-12 lg:py-0 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
            {content?.title?.split('Together')[0] || "The Impact We've "} <span className="text-green-500">{content?.title?.includes('Together') ? 'Made Together' : 'Made'}</span>
          </h2>
          <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>
 
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
          
          {/* Left Side: Image */}
          <div className="flex-1 w-full lg:w-1/2 relative flex justify-center lg:justify-start items-end mb-4 lg:mb-0">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-1/2 bg-green-500/5 rounded-[100%] blur-3xl -z-10"></div>
            <img 
              src={content?.image_url || VolunteerImg} 
              alt="PCHC Volunteer" 
              className="w-full h-auto object-contain max-w-[300px] sm:max-w-[350px] md:max-w-[420px] drop-shadow-2xl z-10"
              onError={(e) => {
                (e.target as HTMLImageElement).src = VolunteerImg;
              }}
            />
          </div>
 
          {/* Right Side: Curved Impact Items */}
          <div className="flex-1 w-full lg:w-1/2 flex flex-col items-center lg:items-start space-y-4">
            <div className="w-full flex flex-col space-y-3 sm:space-y-4 items-center lg:items-start px-2 sm:px-0">
              {impacts.map((label, index) => (
                <div 
                  key={index} 
                  className={`flex items-stretch group transition-all duration-500 hover:scale-[1.02] w-full max-w-[500px] ${getStaggerClass(index)}`}
                >
                  {/* Left Pill Tab */}
                  <div className="flex-shrink-0 w-6 min-h-[3.5rem] md:h-14 bg-green-500 rounded-l-full shadow-[4px_0_15px_rgba(34,197,94,0.25)] z-20"></div>
                  
                  {/* Content Pill */}
                  <div className="flex-grow bg-[#FFF7E8] py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-r-full shadow-lg -ml-3 border border-orange-100/30 flex items-center min-h-[3.5rem] md:h-14">
                    <span className="font-outfit text-sm sm:text-base md:text-xl font-medium text-gray-800 tracking-wide line-clamp-2">
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
 
            {/* Centered Button */}
            <div className="mt-8 w-full flex justify-center lg:justify-start lg:pl-12">
              <Link
                to={content?.cta_link || "/blogs"}
                className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm text-center text-xs md:text-sm uppercase tracking-widest min-w-[200px] w-full sm:w-auto"
              >
                {content?.cta_text || "See All Impact Stories"}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Impact;
