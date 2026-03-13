import { useEffect } from "react";
import Hero from "../Components/Hero.js";
import ImgArr from '../assets/Utils/ImageCarousel.js'
import Team from "../Components/Team.js";
import HomeContact from "../Components/HomeContact.js";
import WhoWeAre from "../Components/WhoWeAre.js";
import WhatWeDo from "../Components/WhatWeDo.js";
import Impact from "../Components/Impact.js";
import Stories from "../Components/Stories.js";
import Achievements from "../Components/Achievements.js";
import GetInvolved from "../Components/GetInvolved.js";

const Home = () => {
  useEffect(() => {
    document.documentElement.classList.add('snap-enabled');

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id) {
            window.history.replaceState(null, '', `/#${id}`);
            window.dispatchEvent(new Event('hashchange'));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.5,
      rootMargin: "-10% 0px -10% 0px"
    });

    const sections = document.querySelectorAll('.snap-start[id]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('snap-enabled');
    };
  }, []);

  const heroSlides = [
    {
      image: ImgArr[0],
      title: <>Together We Can <span className="text-green-500">Change Lives</span></>,
      description: "Providing specialized care and education for children with autism and intellectual disabilities, ensuring a nurturing environment where no child is left behind."
    },
    {
      image: ImgArr[1],
      title: <>Empowering <span className="text-green-500">Their Future</span></>,
      description: "Customized learning programs and dedicated educators working together to unlock every child's unique potential through specialized support."
    },
    {
      image: ImgArr[2],
      title: <>Unleashing <span className="text-green-500">Creativity</span></>,
      description: "Fostering self-expression and cognitive development through inclusive art therapy and creative programs tailored for diverse abilities."
    },
    {
      image: ImgArr[3],
      title: <>Every Child <span className="text-green-500">Belongs</span></>,
      description: "Building a compassionate community where inclusion, joy, and individual growth are celebrated every single day for all our children."
    }
  ];

  return (
    <div className="scroll-smooth">
      <div id="hero" className="snap-start relative min-h-screen w-full">
        <Hero slides={heroSlides} />
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
