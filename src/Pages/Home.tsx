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
            content="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
            icon={Donate}
          />
          <DonateCard
            title="Be A Volunteer"
            content="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
            icon={Volunteer}
          />
        </div>
        <Mission />
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-20">
          <ImageText img={ImgArr[0]} />
          <ImageText img={ImgArr[1]} />
          <ImageText img={ImgArr[2]} />
        </div>
        <Mission />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          <Profile />
          <Profile />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Home;