import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { coupleData } from '../data/romanticData';
import { useSound } from '../context/SoundContext';
import { Sparkles, ChevronLeft, ChevronRight, X, Heart, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PhotoGallery = ({ selectedPhotoIndex: externalIndex, setSelectedPhotoIndex: setExternalIndex }) => {
  const { playPopSound, playSparkleSound } = useSound();
  const [internalIndex, setInternalIndex] = useState(null);

  const selectedPhotoIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const setSelectedPhotoIndex = setExternalIndex || setInternalIndex;

  const openLightbox = (index) => {
    playSparkleSound();
    setSelectedPhotoIndex(index);
    // Sparkle confetti effect
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#FF6F91', '#FFC8D8', '#FFFFFF']
    });
  };

  const closeLightbox = () => {
    playPopSound();
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    playPopSound();
    setSelectedPhotoIndex((prev) => (prev + 1) % coupleData.photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    playPopSound();
    setSelectedPhotoIndex((prev) => (prev - 1 + coupleData.photos.length) % coupleData.photos.length);
  };

  return (
    <section id="gallery" className="py-20 px-4 max-w-6xl mx-auto relative z-10">
      {/* Section Title Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pink shadow-sm mb-3"
        >
          <ImageIcon className="w-4 h-4 text-cute-rose" />
          <span className="text-xs font-bold text-cute-rose uppercase tracking-widest">Our Precious Moments</span>
        </motion.div>
        <h2 className="font-script text-4xl sm:text-6xl text-cute-rose dark:text-pink-300 font-bold mb-3">
          Photo Gallery 📸
        </h2>
        <p className="text-gray-600 dark:text-pink-200 text-sm sm:text-base max-w-md mx-auto">
          Kumpulan momen terindah saat kita bersama. Klik foto untuk melihat kenangan manis lebih dekat! 💗
        </p>
      </div>

      {/* Scrapbook Polaroid Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {coupleData.photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
            onClick={() => openLightbox(index)}
            className="relative cursor-pointer group"
            style={{ transform: `rotate(${photo.rotate})` }}
          >
            {/* Scrapbook Tape Decor */}
            <div className={index % 2 === 0 ? "tape-top-left" : "tape-top-right"} />

            {/* Polaroid Card Wrapper */}
            <div className="bg-white dark:bg-pink-950 p-3 sm:p-4 rounded-2xl shadow-cute group-hover:shadow-cute-lg transition-all duration-300 border border-pink-100 dark:border-pink-900/50">
              
              {/* Photo Box */}
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-inner bg-pink-50">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
                
                {/* Hover Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-semibold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" /> Tap to view
                  </span>
                </div>
              </div>

              {/* Polaroid Bottom Title */}
              <div className="pt-3 pb-2 text-center">
                <h3 className="font-body text-base font-bold text-cute-rose dark:text-pink-300 leading-tight">
                  {photo.title}
                </h3>
              </div>

              {/* Cute Sticker Badge */}
              <div className="absolute -bottom-2 -right-2 z-30 bg-pink-100 dark:bg-pink-900 text-cute-rose dark:text-pink-200 text-xs px-2.5 py-1 rounded-full font-bold shadow-md border-2 border-white dark:border-pink-800">
                {photo.sticker}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Zoom Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Active Polaroid Card Content */}
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white dark:bg-pink-950 p-4 sm:p-6 rounded-3xl shadow-2xl border-4 border-pink-200 dark:border-pink-800"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-inner mb-4">
                <img
                  src={coupleData.photos[selectedPhotoIndex].url}
                  alt={coupleData.photos[selectedPhotoIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption & Info */}
              <div className="text-center px-2">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Heart className="w-5 h-5 text-cute-rose fill-current animate-bounce" />
                  <h3 className="font-script text-3xl font-bold text-cute-rose dark:text-pink-300">
                    {coupleData.photos[selectedPhotoIndex].title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-pink-200 text-sm font-medium my-2">
                  {coupleData.photos[selectedPhotoIndex].caption}
                </p>

                <div className="mt-3 flex items-center justify-center text-xs text-gray-400 dark:text-pink-300/70 border-t border-pink-100 dark:border-pink-900 pt-3">
                  <span className="bg-pink-100 dark:bg-pink-900 text-cute-rose px-3 py-1 rounded-full font-bold">
                    {selectedPhotoIndex + 1} / {coupleData.photos.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
