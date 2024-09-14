import React from 'react';
import { motion } from 'framer-motion';

export default function AboutCard({ img, title, isReversed }) {
  return (
    <div className={`mx-auto flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-around py-10 px-4 sm:px-8 md:px-12 lg:px-24`}>
      {/* Image animation - Sliding in from the left (or right if reversed) */}
      <motion.div
        className='w-full md:w-1/2'
        initial={{ x: isReversed ? 200 : -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <img
          src={img}
          alt="About Image"
          className="w-full md:w-3/4 lg:w-2/3 h-auto rounded-lg shadow-md"
        />
      </motion.div>

      {/* Text animation - Sliding in from the right (or left if reversed) */}
      <motion.div
        className="w-full md:w-1/2 text-center md:text-left"
        initial={{ x: isReversed ? -200 : 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h2 className='text-xl sm:text-2xl font-medium mb-4'>{title}</h2>
        <p className='opacity-70 text-sm md:text-base lg:text-lg w-full md:w-3/4 lg:w-2/3 mx-auto md:mx-0 leading-relaxed'>
          Pallotti Children Hope Centre is a boarding Centre for Children with autism,
          mild and moderate Intellectual Disabilities. The Centre, which is the first of its kind in Rwanda,
          is founded by a German organization known as Wir Für Ruanda. This organization realized,
          through Dr. Bernd BIERBUM, how marginalized and excluded children with intellectual disabilities were,
          and still are, from many services being enjoyed by other members of society.
        </p>
      </motion.div>
    </div>
  );
}
