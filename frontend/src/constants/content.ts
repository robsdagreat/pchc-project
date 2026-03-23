import ImgArr from '../assets/Utils/ImageCarousel';
import TransparencyImg from '../assets/transparency_handshake.png';
import CaringImg from '../assets/caring_contact.png';

export const HOME_CONTENT = {
  hero: {
    slides: [
      {
        image: ImgArr[0],
        title: "Together, We Can Change Lives",
        highlight: "Can Change Lives",
        description: "At Pallotti Children’s Hope Centre, we provide specialized care and education for children with and intellectual disabilities building a safe, loving environment where every child is seen, supported, and empowered to thrive.",
        maxWidth: "lg:max-w-[80%]"
      },
      {
        image: ImgArr[1],
        title: "Empowering Their Future",
        highlight: "Their Future",
        description: "At Pallotti Children’s Hope Centre, our tailored learning programs and committed educators work hand in hand to unlock every child’s unique potential providing the specialized support they need to grow, learn, and succeed",
        maxWidth: "lg:max-w-[80%]"
      },
      {
        image: ImgArr[2],
        title: "Unleashing Creativity",
        highlight: "Creativity",
        description: "At Pallotti Children’s Hope Centre, we foster self-expression and cognitive development through inclusive art therapy and creative programs tailored to children of all abilities.",
        maxWidth: "lg:max-w-[80%]"
      },
      {
        image: ImgArr[3],
        title: "Every Child Belongs",
        highlight: "Belongs",
        description: "At Pallotti Children’s Hope Centre, we create a loving and inclusive community where every child is valued, joy is shared, and each individual is supported to grow and thrive every day",
        maxWidth: "lg:max-w-[80%]"
      }
    ]
  },
  whoWeAre: {
    title: "Who We Are",
    highlight: "Are",
    description: "We provide specialized education for children with intellectual disabilities through tailored learning programs and individualized support. At Pallotti Children’s Hope Centre, we create a nurturing and inclusive environment where every child is empowered to develop essential life skills, build confidence, and reach their full potential. We believe every child deserves the opportunity to learn, grow, and thrive.",
    bullets: [
      "Personalized learning programs",
      "Inclusive and supportive environment",
      "Focus on life skills and independence",
      "Empowering children to reach their full potential"
    ],
    image: ImgArr[0],
    ctaText: "Learn More About Us"
  },
  whatWeDo: {
    title: "What We Do",
    highlight: "We Do",
    services: [
      {
        title: "Sports & Physical Development",
        description: "We promote active and healthy lifestyles through inclusive sports and physical activities tailored to each child’s ability. Through games, teamwork, and movement, we help children build confidence, improve coordination, and experience the joy of participation."
      },
      {
        title: "Logotherapy & Occupational Therapy",
        description: "We provide specialized Speech and Language Therapy (Logotherapy) and Occupational Therapy to support children with intellectual disabilities through personalized sessions that improve communication, develop daily living skills, and enhance independence."
      },
      {
        title: "Physiotherapy",
        description: "We offer specialized physiotherapy to support children with physical challenges through guided exercises and individualized care that improve mobility, strength, balance, and coordination."
      },
      {
        title: "Inclusive & Child-Centered Support",
        description: "We ensure every child receives personalized care in a safe and inclusive environment, helping them build confidence, grow, and reach their full potential."
      }
    ],
    ctaText: "Support A Cause"
  },
  transparency: {
    title: "Your Trust Matters to Us",
    highlight: "Trust",
    description: "We maintain complete transparency in how donations are utilized. Every contribution is tracked, audited, and directed toward the intended program.",
    points: [
      "Annual reports available",
      "Regular impact updates",
      "Verified NGO activities",
      "Secure online donation process"
    ],
    image: TransparencyImg,
    ctaText: "View Donation Reports"
  },
  getInvolved: {
    title: "Ways to Get Involved",
    highlight: "Get Involved",
    steps: [
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
    ],
    ctaText: "Partner with Us"
  },
  contact: {
    title: "Get In Touch",
    subtitle: "We are here for you! How can we help?",
    image: CaringImg,
    details: {
      address: "674 Washington Avenue, Kimisagara",
      phone: "+250 788 123 456",
      email: "info@pallottihopecentre.org"
    },
    socials: {
      facebook: "#",
      instagram: "#",
      twitter: "#"
    }
  }
};
