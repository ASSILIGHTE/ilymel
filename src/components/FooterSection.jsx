import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import confetti from 'canvas-confetti';

export const FooterSection = () => {
  const { playPopSound, playSparkleSound } = useSound();

  const handleHeartBurst = () => {
    playSparkleSound();
    playPopSound();
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.9 },
      colors: ['#FF6F91', '#FF9FBA', '#FFC8D8', '#FFFFFF']
    });
  };

  return (
    <footer className="relative py-12 px-4 border-t border-pink-200/60 dark:border-pink-900/40 text-center z-10">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
        
        {/* Heart Burst Action Button */}
        <motion.button
          whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.85 }}
          onClick={handleHeartBurst}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-cute-rose to-pink-400 text-white shadow-cute flex items-center justify-center cursor-pointer border-2 border-white dark:border-pink-300/30"
          title="Klik untuk kejutan cinta! 💗"
        >
          <Heart className="w-8 h-8 fill-current animate-pulse" />
        </motion.button>

        <p className="font-script text-2xl text-cute-rose dark:text-pink-300 font-bold">
          Forever & Always 🎀
        </p>

        <p className="text-xs text-gray-500 dark:text-pink-200/70 font-medium">
          "A cute little digital love gift made especially for my favorite person."
        </p>

        <div className="flex items-center justify-center gap-1 text-xs text-gray-400 dark:text-pink-300/50 mt-2">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-cute-rose fill-current" />
          <span>just for you</span>
        </div>
      </div>
    </footer>
  );
};
