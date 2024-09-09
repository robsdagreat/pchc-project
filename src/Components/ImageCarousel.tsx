import React, { useEffect } from 'react'
import { useState } from 'react'

const ImageCarousel = ({images, introText}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 7000)

    return () => clearInterval(interval);
  }, [images])

  return (
    <div className="relative h-[calc(85vh-4rem)] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
          <img src={image} alt={`Carousel Image ${index}`} className="w-full h-full object-cover" />
        </div>
      ))}
      {introText && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold text-center z-10 px-4 w-1/3">
          {introText}
        </div>
      )}
    </div>
  )
}

export default ImageCarousel