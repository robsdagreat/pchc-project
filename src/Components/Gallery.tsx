import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import galleryData, { GalleryDataItem } from './GalleryData';

const ImageThumbnail: React.FC<{ image: GalleryDataItem; onClick: () => void }> = ({ image, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="image-thumbnail relative cursor-pointer p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
    onClick={onClick}
  >
    <div className="aspect-w-16 aspect-h-9">
      <img src={image.thumbnailUrl} alt={image.title} className="w-full h-full object-cover rounded-lg" />
    </div>
    <div className="absolute bottom-2 left-2 right-2 p-2 bg-gray-800 bg-opacity-75 text-white rounded-lg">
      <h3 className="text-sm font-semibold truncate">{image.title}</h3>
      <p className="text-xs truncate">{image.category}</p>
    </div>
  </motion.div>
);

const ImageViewer: React.FC<{ image: GalleryDataItem; onClose: () => void; onPrev: () => void; onNext: () => void }> = ({ image, onClose, onPrev, onNext }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
  >
    <div className="relative w-full max-w-4xl max-h-[90vh]">
      <img src={image.fullImageUrl} alt={image.title} className="w-full h-full object-contain" />
      <button onClick={onClose} className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1">
        <X size={24} />
      </button>
      <button onClick={onPrev} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-1">
        <ChevronLeft size={24} />
      </button>
      <button onClick={onNext} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-1">
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-2 left-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded">
        <h3 className="text-lg font-semibold truncate">{image.title}</h3>
        <p className="text-sm truncate">{image.category}</p>
      </div>
    </div>
  </motion.div>
);

const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prev) => (prev === null || prev === 0 ? galleryData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === null || prev === galleryData.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
      <motion.div layout className="thumbnails-container flex flex-wrap -mx-2">
        {galleryData.map((image, index) => (
          <ImageThumbnail key={image.id} image={image} onClick={() => handleThumbnailClick(index)} />
        ))}
      </motion.div>
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <ImageViewer
            image={galleryData[selectedImageIndex]}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;