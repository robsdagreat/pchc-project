import React from 'react';
import ImageCarousel from '../Components/ImageCarousel';
import ImgArr from "../assets/Utils/ImageCarousel";
import AboutCard from '../Components/AbouCard';

const About = () => {
  const aboutData = [
    {
      img: ImgArr[0],
      title: "Welcome to Pallotti children hope centre",
    },
    {
      img: ImgArr[1],
      title: "Rehabilitation",
    },
    {
      img: ImgArr[2],
      title: "Leg therapy",
    },
  ];

  return (
    <div className='pb-20'>
      <div className="w-full">
        <ImageCarousel
          images={ImgArr}
          introText="ABOUT US"
        />
      </div>
      <div className="my-20">
        {aboutData.map((item, index) => (
          <AboutCard
            key={index}
            img={item.img}
            title={item.title}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}

export default About;
