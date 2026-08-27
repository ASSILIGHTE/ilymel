import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';

export const CuteMascots = ({ onFlowerShower }) => {
  const { playPopSound, playSparkleSound } = useSound();
  const [bunnySpeech, setBunnySpeech] = useState(false);
  const [catSpeech, setCatSpeech] = useState(false);
  const [teddySparkles, setTeddySparkles] = useState(false);

  const handleBunnyClick = () => {
    playPopSound();
    setBunnySpeech(true);
    setTimeout(() => setBunnySpeech(false), 2500);
  };

  const handleCatClick = () => {
    playPopSound();
    setCatSpeech(true);
    setTimeout(() => setCatSpeech(false), 2500);
  };

  const handleTeddyClick = () => {
    playSparkleSound();
    setTeddySparkles(true);
    setTimeout(() => setTeddySparkles(false), 2000);
  };

  const handleFlowerClick = () => {
    playSparkleSound();
    if (onFlowerShower) onFlowerShower();
  };

  return (
    <div className="relative w-full flex flex-wrap items-center justify-center gap-6 py-4 select-none">
      {/* Bunny Mascots 🐰 */}
      <div className="relative">
        <AnimatePresence>
          {bunnySpeech && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-pink-900 text-cute-rose dark:text-pink-200 text-xs px-3 py-1 rounded-full shadow-md whitespace-nowrap font-bold border border-pink-200"
            >
              Love you so much! 💗
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9, y: -30 }}
          onClick={handleBunnyClick}
          className="p-3 bg-white/80 dark:bg-pink-950/80 rounded-full shadow-cute border border-pink-200/80 text-3xl cursor-pointer transition-all"
          title="Klik Bunny! 🐰"
        >
          🐰
        </motion.button>
      </div>

      {/* Teddy Bear Mascots 🧸 */}
      <div className="relative">
        <AnimatePresence>
          {teddySparkles && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-4 pointer-events-none flex items-center justify-center text-xl text-yellow-300"
            >
              <span className="absolute -top-2 -left-2 animate-ping">✨</span>
              <span className="absolute -top-2 -right-2 animate-bounce">💖</span>
              <span className="absolute -bottom-2 -left-2 animate-pulse">🌸</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.25, rotate: 8 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleTeddyClick}
          className="p-3 bg-white/80 dark:bg-pink-950/80 rounded-full shadow-cute border border-pink-200/80 text-3xl cursor-pointer transition-all"
          title="Klik Teddy! 🧸"
        >
          🧸
        </motion.button>
      </div>

      {/* Cute Cat Mascots 🐱 */}
      <div className="relative">
        <AnimatePresence>
          {catSpeech && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -45, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white dark:bg-pink-900 text-cute-rose dark:text-pink-200 text-xs px-3 py-1 rounded-full shadow-md whitespace-nowrap font-bold border border-pink-200"
            >
              Meow~ Purrr 💗
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.25, rotate: -8 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleCatClick}
          className="p-3 bg-white/80 dark:bg-pink-950/80 rounded-full shadow-cute border border-pink-200/80 text-3xl cursor-pointer transition-all"
          title="Klik Cat! 🐱"
        >
          🐱
        </motion.button>
      </div>

      {/* Flower Petal Shower Trigger 🌸 */}
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.25, rotate: 180 }}
          transition={{ duration: 0.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleFlowerClick}
          className="p-3 bg-white/80 dark:bg-pink-950/80 rounded-full shadow-cute border border-pink-200/80 text-3xl cursor-pointer transition-all"
          title="Klik Bunga untuk hujan kelopak! 🌸"
        >
          🌸
        </motion.button>
      </div>
    </div>
  );
};
