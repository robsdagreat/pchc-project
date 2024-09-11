import React from "react";
import ImageCarousel from "../Components/ImageCarousel.js";
import Caro1 from "../assets/Home-bg.png";
import Caro2 from "../assets/image-1.png";
import Caro3 from "../assets/image.png";
import Caro4 from "../assets/image-3.png";
import Card from "../Components/Card.js";
import Card2 from "../Components/Card2.js";
import Donate from "../assets/material-symbols-light_volunteer-activism-outline.png";
import Volunteer from "../assets/game-icons_shaking-hands.png";
import DonateCard from "../Components/Donate.js";
import Mission from "../Components/Mission.js";
import ImageText from "../Components/ImageText.js";
import Member from "../Components/Members.js";
import Profile from "../Components/Profile.js";

const Home = () => {
  const imgArr = [Caro1, Caro2, Caro3, Caro4];
  return (
    <div>
      <div className="mt-20 mb-40">
        <div>
          <ImageCarousel
            images={imgArr}
            introText="Pallotti Children Hope Centre, The home of dreams ! "
          />
        </div>
        <div className="absolute left-96 bottom-[-40px] z-10">
          <Card />
        </div>
        <div className="absolute right-96 bottom-[-40px] z-10">
          <Card2 />
        </div>
      </div>
      <div className="flex flex-row justify-around ml- mt-60 ">
        <div className="ml-60">
          <DonateCard
            title="Make Donation"
            content="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
            icon={Donate}
          />
        </div>
        <div className="mr-60">
          <DonateCard
            title="Be A Volunteer"
            content="Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic."
            icon={Volunteer}
          />
        </div>
      </div>
      <div>
        <Mission/>
      </div>
      <div className="flex flex-row ml-40">
        <div><ImageText img={Caro4}/></div>
        <div><ImageText img={Caro2}/></div>
        <div><ImageText img={Caro3}/></div>
      </div>
      <div>
      <Mission/>
      </div>
      <div className="flex flex-row justify-around ml-40 pb-60">
        <div><Profile/></div>
        <div><Profile/></div>
        <div><Profile/></div>
      </div>
    </div>
  );
};

export default Home;
