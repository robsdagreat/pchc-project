import ImageCarousel from '../Components/ImageCarousel';
import ImgArr from "../assets/Utils/ImageCarousel";
import AboutCard from '../Components/AbouCard';

const About = () => {
  const aboutData = [
    {
      img: ImgArr[0],
      title: "Welcome to Pallotti children hope centre",
      info: `Pallotti Children Hope Centre is a boarding Centre for Children with autism,
          mild and moderate Intellectual Disabilities. The Centre, which is the first of its kind in Rwanda,
          is founded by a German organization known as Wir Für Ruanda. This organization realized,
          through Dr. Bernd BIERBUM, how marginalized and excluded children with intellectual disabilities were,
          and still are, from many services being enjoyed by other members of society.`
    },
    {
      img: ImgArr[1],
      title: "Rehabilitation",
      info: "Our children need rehabilitation in different domains. Our Center provides different special services to handle this issue. Some of them are: special needs education, occupational and logotherapy, physiotherapy,counselling, sport, home care or boarding, nutrition, health care, community awareness, … "
    },
    {
      img: ImgArr[2],
      title: "Logo therapy",
      info: "Our core aim is to improve the speech style of children through teaching and training, discussion, assisting and helping the child in holistic way so that the children be free to speak or to express their feeling and their needs as well as integrating them in their communities. The problem of speech and language and the other above cited become a barrier to them to be integrated in the society and they become isolated with others. It is in such circumstance Father Jean Pierre got a vital idea to help them through the initiation of this service of Logo therapy."
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
            info={item.info}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>
    </div>
  );
}

export default About;
