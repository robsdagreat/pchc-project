import { BookOpen, HeartPulse, Utensils, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOME_CONTENT } from '../constants/content';

const WhatWeDo = () => {
  const { whatWeDo } = HOME_CONTENT;
  const icons = [
    <BookOpen key="edu" className="w-10 h-10 text-green-500" />,
    <HeartPulse key="health" className="w-10 h-10 text-green-500" />,
    <Utensils key="food" className="w-10 h-10 text-green-500" />,
    <Users key="women" className="w-10 h-10 text-green-500" />
  ];

  return (
    <section className="w-full bg-slate-100 py-10 md:py-12 lg:py-0 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48">
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
          {whatWeDo.title.split(whatWeDo.highlight)[0]}
          <span className="text-green-500">{whatWeDo.highlight}</span>
          {whatWeDo.title.split(whatWeDo.highlight)[1]}
        </h2>
        <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 max-w-6xl mx-auto">
        {whatWeDo.services.map((service, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left">
            <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm border border-green-50/50">
              {icons[index]}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-3 font-serif line-clamp-1 border-b-2 border-green-500 inline-block pb-1">
                {service.title}
              </h3>
              <p className="font-outfit font-light text-gray-700 text-base xl:text-lg leading-relaxed tracking-wide">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
 
      <div className="mt-12 text-center">
          <Link
          to="/our-work"
          className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 text-center text-[15px] tracking-wide inline-block"
        >
          {whatWeDo.ctaText}
        </Link>
      </div>
    </section>
  );
};

export default WhatWeDo;
