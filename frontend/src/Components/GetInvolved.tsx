import { Link } from 'react-router-dom';

const GetInvolved = () => {
  const steps = [
    {
      number: 1,
      title: "Donate",
      description: "Your financial support directly funds education, medical aid, meals, and community upliftment."
    },
    {
      number: 2,
      title: "Become a Volunteer",
      description: "Join our passionate volunteer team and contribute your time and skills to fieldwork and events."
    },
    {
      number: 3,
      title: "Sponsor a Child",
      description: "Help a child with school fees, books, and essential supplies for an entire year"
    },
    {
      number: 4,
      title: "Corporate Partnership",
      description: "Partner with us to run CSR-driven development programs."
    }
  ];

  return (
    <section className="w-full bg-[#FCF8F2] py-10 md:py-12 lg:py-0 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48">
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
          Ways to <span className="text-green-500">Get Involved</span>
        </h2>
        <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left">
            <div className="flex-shrink-0 bg-white shadow-sm border border-green-50/50 flex items-center justify-center rounded-2xl w-16 h-16 sm:w-20 sm:h-20">
              <span className="text-3xl sm:text-4xl font-bold text-green-500 font-serif">{step.number}</span>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 font-serif line-clamp-1 border-b-2 border-green-500 inline-block pb-1">
                {step.title}
              </h3>
              <p className="font-outfit font-light text-gray-700 text-base xl:text-lg leading-relaxed tracking-wide">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 md:mt-12 text-center">
        <Link
          to="/#contact"
          className="w-full sm:w-auto border-2 border-green-500 text-green-500 hover:bg-bg-green-500 hover:text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm text-center text-[15px] tracking-wide inline-block"
        >
          Partner with Us
        </Link>
      </div>
    </section>
  );
};

export default GetInvolved;
