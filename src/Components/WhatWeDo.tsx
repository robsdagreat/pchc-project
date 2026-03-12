import { BookOpen, HeartPulse, Utensils, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhatWeDo = () => {
  const services = [
    {
      icon: <BookOpen className="w-10 h-10 text-green-500" />,
      title: "Education for All",
      description: "We support children from low-income families with school fees, books, uniforms, and digital learning tools. Our aim is to keep children in school and reduce dropout rates."
    },
    {
      icon: <HeartPulse className="w-10 h-10 text-green-500" />,
      title: "Health & Medical Support",
      description: "We organize free health camps, provide essential medicines, and help families with medical emergencies. Good health should never be a privilege."
    },
    {
      icon: <Utensils className="w-10 h-10 text-green-500" />,
      title: "Food & Nutrition",
      description: "We run community kitchens, monthly ration distribution drives, and food support programs to ensure no family goes to bed hungry."
    },
    {
      icon: <Users className="w-10 h-10 text-green-500" />,
      title: "Women Empowerment",
      description: "We help women acquire vocational skills, financial literacy, and entrepreneurship support to live independently and with dignity."
    }
  ];

  return (
    <section className="w-full bg-slate-100 py-10 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48 border-t border-gray-200">
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4 tracking-tight">
          What <span className="text-green-500">We Do</span>
        </h2>
        <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
      </div>
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-10 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start text-center sm:text-left">
            <div className="flex-shrink-0 bg-white p-4 rounded-2xl shadow-sm border border-green-50/50">
              {service.icon}
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
          to="/donate"
          className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white font-bold py-3 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 text-center text-[15px] tracking-wide inline-block"
        >
          Support A Cause
        </Link>
      </div>
    </section>
  );
};

export default WhatWeDo;
