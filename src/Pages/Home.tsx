import React from "react";
import ImageCarousel from "../Components/ImageCarousel.js";
import Card from "../Components/Card.js";
import Card2 from "../Components/Card2.js";
import Donate from "../assets/material-symbols-light_volunteer-activism-outline.png";
import Volunteer from "../assets/game-icons_shaking-hands.png";
import DonateCard from "../Components/Donate.js";
import Mission from "../Components/Mission.js";
import ImageText from "../Components/ImageText.js";
import Profile from "../Components/Profile.js";
import ImgArr from '../assets/Utils/ImageCarousel.js'
import Prof from '../assets/profile.png'


const Home = () => {
  return (
    <div className="relative">
      <div className="relative mb-40">
        <ImageCarousel
          images={ImgArr}
          introText="Pallotti Children Hope Centre, The home of dreams!"
        />
        <div className="absolute left-0 right-0 bottom-0 transform translate-y-1/2 z-10 w-full px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            <Card />
            <Card2 />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-60 sm:mt-40">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-20">
          <DonateCard
            title="Make Donation"
            content="Your support can make a life-changing difference! By donating, you're not only providing immediate assistance but also offering hope and opportunities to those in need. Together, we can create a brighter, more compassionate future for all."
            icon={Donate}
          />
          <DonateCard
            title="Be A Volunteer"
            content="Volunteering is a powerful way to make a lasting impact in the lives of others. By giving your time and skills, you're contributing to positive change and personal growth. Together, we can build stronger, compassionate communities."
            icon={Volunteer}
          />
        </div>
        <Mission 
         section='OUR MISSION'
         content='To provide a safe, nurturing environment for children with autism, mild and moderate intellectual disabilities, offering them the care, education, and support they deserve. We strive to raise awareness, promote inclusion, and ensure no child is left behind.'
        />
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-20">
          <ImageText 
          img={ImgArr[0]} 
          head='Skills oriented'
          message='Our goal is to equip beneficiaries with the skills and knowledge needed to take charge of their lives and become independent, 
          while also rehabilitating them to ensure a smooth integration into the community, 
          fostering greater acceptance and inclusion.'
          />
          <ImageText img={ImgArr[1]} 
           head='Fostering acceptance'
           message='
            We aim to raise awareness and educate parents and the broader community
             to embrace and support children with intellectual disabilities.
              By encouraging understanding and compassion, we work to reduce prejudice,
               stereotypes, stigma, and discrimination.'
           
          />
          <ImageText img={ImgArr[2]} 
           head='Educators and Families'
           message='We train teachers in the basics of education and special needs, particularly intellectual disabilities, to better support children. We also work with families to train young people with intellectual disabilities who haven’t had the chance to attend the Center, helping them grow and develop at home.'
           
          />
        </div>
        <Mission 
        section='OUR TEAM'
        content='At Pallotti Children Hope Centre, we are fortunate to have a dedicated and passionate team that works tirelessly to help us achieve our mission of supporting children with intellectual disabilities. This large and diverse group of professionals, volunteers, and caregivers shares our commitment to providing the best care and opportunities for the children. While our entire team plays an essential role in making our vision a reality, we would like to introduce the three main leaders who guide and shape our efforts.'
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 mx-5">
          <Profile 
          name='Dr.  Bernad Bierbum'
          position="the Founder of the PCHC"
          profile={Prof}
          />
          <Profile 
          name='Fr. Eugène NIYONZIMA'
          position="the Superior of the Pallottines"
          profile={Prof}
          />
          <Profile 
          name='Fr. Jean Pierre MUNYANEZA'
          position="Director of PCHC"
          profile={Prof}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;