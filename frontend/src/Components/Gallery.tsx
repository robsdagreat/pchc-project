import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ImageIcon, PlayCircle } from 'lucide-react';
import { fetchData } from '../utils/api.js';

interface GalleryDataItem {
  id: number;
  thumbnailUrl: string;
  fullImageUrl: string;
  title: string;
  category: string;
  mediaType: string;
}

const ImageThumbnail = forwardRef<HTMLDivElement, { image: GalleryDataItem; onClick: () => void; index: number }>(
  ({ image, onClick, index }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.05, ease: [0.21, 0.45, 0.32, 0.9] }}
        whileHover={{ y: -8 }}
        className="break-inside-avoid mb-8 group relative cursor-pointer overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 bg-white"
        onClick={onClick}
      >
        <div className="relative overflow-hidden aspect-auto bg-gray-100">
          {!isLoaded && (
            <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
              <ImageIcon className="text-slate-300 w-12 h-12" />
            </div>
          )}
          {image.mediaType === 'video' ? (
             <video 
                src={image.thumbnailUrl} 
                onLoadedData={() => setIsLoaded(true)}
                className={`w-full h-auto object-cover transition-all duration-1000 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} 
                autoPlay muted loop playsInline
             />
          ) : (
             <img 
               src={image.thumbnailUrl} 
               alt={image.title} 
               onLoad={() => setIsLoaded(true)}
               onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800';
                 setIsLoaded(true);
               }}
               className={`w-full h-auto object-cover transition-all duration-1000 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} 
             />
          )}
          {image.mediaType === 'video' && (
             <div className="absolute top-4 right-4 text-white/80 group-hover:text-white group-hover:scale-110 transition-all z-10 drop-shadow-lg">
                <PlayCircle size={28} />
             </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <span className="text-green-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3 block font-outfit">
                {image.category}
              </span>
              <h3 className="text-white text-xl font-bold leading-tight mb-4">{image.title}</h3>
              <div className="flex items-center text-white/80 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors font-outfit">
                <span className="w-8 h-[1px] bg-green-500 mr-3"></span>
                <span>View Details</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    );
  }
);

ImageThumbnail.displayName = 'ImageThumbnail';

const ImageViewer: React.FC<{ 
  image: GalleryDataItem; 
  onClose: () => void; 
  onPrev: () => void; 
  onNext: () => void;
}> = ({ image, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0F172A]/98 backdrop-blur-xl flex items-center justify-center z-[100] p-4 md:p-12"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-7xl flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute -top-16 right-0 text-white/40 hover:text-white transition-all p-3 hover:rotate-90 duration-300"
        >
          <X size={36} />
        </button>

        <div className="relative group w-full flex items-center justify-center">
          <button 
            onClick={onPrev} 
            className="absolute left-0 md:-left-24 text-white/20 hover:text-white hover:bg-white/5 rounded-full p-6 transition-all duration-300 hidden md:block"
          >
            <ChevronLeft size={40} />
          </button>
          
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(34,197,94,0.15)] bg-slate-900/50 border border-white/10"
          >
            {image.mediaType === 'video' ? (
              <video 
                src={image.fullImageUrl} 
                className="max-w-[90vw] max-h-[80vh] object-contain select-none" 
                controls autoPlay playsInline
              />
            ) : (
              <img 
                src={image.fullImageUrl} 
                alt={image.title} 
                className="max-w-[90vw] max-h-[80vh] object-contain select-none" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800';
                }}
              />
            )}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white">
              <span className="text-green-500 text-[11px] font-bold uppercase tracking-[0.3em] mb-2 block font-outfit">
                {image.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{image.title}</h3>
            </div>
          </motion.div>

          <button 
            onClick={onNext} 
            className="absolute right-0 md:-right-24 text-white/20 hover:text-white hover:bg-white/5 rounded-full p-6 transition-all duration-300 hidden md:block"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryDataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const response = await fetchData('/gallery');
        const items = response.data.gallery.map((item: any) => ({
          id: item.id,
          thumbnailUrl: item.url,
          fullImageUrl: item.url,
          title: item.title,
          category: item.category,
          mediaType: item.media_type
        }));
        setGalleryItems(items);
      } catch (err) {
        setError('Failed to load gallery items.');
      } finally {
        setLoading(false);
      }
    };
    loadGallery();
  }, []);

  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(galleryItems.map(img => img.category).filter(Boolean)))];
    return cats as string[];
  }, [galleryItems]);

  const filteredData = useMemo(() => {
    if (activeCategory === 'All') return galleryItems;
    return galleryItems.filter(img => img.category === activeCategory);
  }, [activeCategory, galleryItems]);

  const handleThumbnailClick = (image: GalleryDataItem) => {
    const index = galleryItems.findIndex(img => img.id === image.id);
    setSelectedImageIndex(index);
  };

  const handleClose = () => setSelectedImageIndex(null);

  const handlePrev = () => {
    setSelectedImageIndex((prev) => (prev === null || prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedImageIndex((prev) => (prev === null || prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#FCF8F2]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-[#FCF8F2] font-bold text-red-500">{error}</div>;

  return (
    <div className="w-full bg-[#FCF8F2] min-h-screen pt-32 pb-16 px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-48">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-green-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block font-outfit leading-none">
              Visual Narrative
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] tracking-tight font-serif uppercase">
              Capturing Every <span className="text-green-500">Moment</span>
            </h1>
            <div className="w-16 h-1 bg-green-500 rounded-full mb-8 shadow-sm"></div>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-2xl font-outfit font-light">
              Explore the collective journey of hope, growth, and transformation through our curated visual archive.
            </p>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 border-b border-gray-100 pb-8">
          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 font-outfit border-2 ${
                  activeCategory === cat 
                  ? 'bg-green-500 border-green-500 text-white shadow-xl shadow-green-100 translate-y-[-2px]' 
                  : 'bg-white border-transparent text-gray-400 hover:text-green-500 hover:border-green-500/20 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-outfit">
              {filteredData.length} memories
            </span>
          </div>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredData.map((image, index) => (
              <ImageThumbnail 
                key={image.id} 
                image={image} 
                index={index}
                onClick={() => handleThumbnailClick(image)} 
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Professional Footer Call to Action (Subtle) */}
        {!selectedImageIndex && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 pt-20 border-t border-gray-100 flex flex-col items-center"
          >
            <p className="text-gray-400 text-sm font-outfit uppercase tracking-widest mb-8">Want to see more of our impact?</p>
            <a 
              href="/blogs" 
              className="px-10 py-4 bg-gray-900 hover:bg-green-500 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-200"
            >
              Explore Our Stories
            </a>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <ImageViewer
            image={galleryItems[selectedImageIndex]}
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