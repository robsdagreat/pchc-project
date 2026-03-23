import { useEffect } from "react";
import Hero from "../Components/Hero.js";
import { fetchData } from "../utils/api.js";
import Team from "../Components/Team.js";
import HomeContact from "../Components/HomeContact.js";
import WhoWeAre from "../Components/WhoWeAre.js";
import WhatWeDo from "../Components/WhatWeDo.js";
import Impact from "../Components/Impact.js";
import Stories from "../Components/Stories.js";
import Achievements from "../Components/Achievements.js";
import GetInvolved from "../Components/GetInvolved.js";

import { HOME_CONTENT } from "../constants/content";

const Home = () => {
  useEffect(() => {
    const loadHomeData = async () => {
      try {
        await fetchData('/content/homepage');
      } catch (err) {
        console.error('Failed to load other homepage data', err);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="scroll-smooth">
      <div id="hero" className="snap-start relative min-h-screen w-full">
        <Hero slides={HOME_CONTENT.hero.slides} />
      </div>
      
      <div id="about-us" className="snap-start min-h-[calc(100vh-5rem)] lg:h-screen py-12 lg:py-0 flex items-center bg-[#FCF8F2] scroll-mt-20">
        <WhoWeAre />
      </div>
      
      <div id="our-work" className="snap-start min-h-[calc(100vh-5rem)] lg:h-screen py-12 lg:py-0 flex items-center bg-slate-100 scroll-mt-20">
        <WhatWeDo />
      </div>


      
      <div className="snap-start min-h-[calc(100vh-5rem)] lg:h-screen py-12 lg:py-0 flex items-center bg-[#FCF8F2] scroll-mt-20">
        <Impact />
      </div>
      
      <div id="blogs" className="snap-start min-h-[calc(100vh-5rem)] lg:h-screen py-12 lg:py-0 flex items-center bg-slate-100 scroll-mt-20">
        <Stories />
      </div>
 
      <div className="snap-start min-h-[calc(100vh-5rem)] lg:h-screen py-12 lg:py-0 flex items-center bg-[#333333] scroll-mt-20">
        <Achievements />
      </div>
 
      <div className="snap-start min-h-[calc(100vh-5rem)] lg:h-screen py-12 lg:py-0 flex items-center bg-[#FCF8F2] scroll-mt-20">
        <GetInvolved />
      </div>
      
      <div className="snap-start min-h-[calc(100vh-5rem)] lg:h-screen py-12 lg:py-0 flex items-center bg-slate-100 scroll-mt-20">
        <Team />
      </div>
 
      <div id="contact" className="snap-start min-h-[calc(100vh-5rem)] lg:h-screen py-12 lg:py-0 flex items-center bg-[#FCF8F2] scroll-mt-20">
        <HomeContact />
      </div>
    </div>
  );
};

export default Home;
