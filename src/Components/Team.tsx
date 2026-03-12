import Prof from '../assets/profile.png'
import Prof2 from '../assets/profile2.png'
import Prof3 from '../assets/profile3.png'

const Team = () => {
  const leaders = [
    {
      name: 'Dr. Bernad Bierbum',
      position: 'Founder of the PCHC',
      profile: Prof,
      bio: 'A visionary leader dedicated to transforming the lives of children through specialized care and compassionate outreach.'
    },
    {
      name: 'Fr. Eugène NIYONZIMA',
      position: 'Superior of the Pallottines',
      profile: Prof3,
      bio: 'Providing spiritual guidance and organizational leadership to ensure the mission of PCHC reaches those in greatest need.'
    },
    {
      name: 'Fr. Jean Pierre MUNYANEZA',
      position: 'Director of PCHC',
      profile: Prof2,
      bio: 'Overseeing daily operations with a focus on excellence, inclusion, and the individual growth of every child at the center.'
    }
  ];

  return (
    <section className="w-full bg-slate-100 py-10 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
            Our <span className="text-green-500">Team</span>
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg xl:text-xl font-outfit font-light px-2 leading-relaxed tracking-wide">
            Our dedicated team works tirelessly to support children with intellectual disabilities, guiding our vision with commitment and care.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {leaders.map((leader, idx) => (
            <div key={idx} className="group relative bg-white rounded-3xl p-5 transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-gray-100 group-hover:border-green-500/30 flex flex-col items-center text-center transform group-hover:-translate-y-2 hover:scale-[1.01]">
              {/* Image Container */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-500 rounded-full scale-105 opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md relative z-10">
                  <img 
                    src={leader.profile} 
                    alt={leader.name} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 tracking-tight">
                  {leader.name}
                </h3>
                <p className="text-green-600 font-semibold mb-3 text-[12px] uppercase tracking-widest">
                  {leader.position}
                </p>
                <p className="text-gray-500 font-outfit font-light text-[15px] leading-relaxed tracking-wide balance">
                  {leader.bio}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="mt-5 w-8 h-1 bg-green-100 group-hover:w-16 group-hover:bg-green-500 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
