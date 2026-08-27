import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useSound } from '../context/SoundContext';
import { Heart, Sparkles } from 'lucide-react';

export const OpeningScreen = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { startMusic, playLetterOpenSound, playSparkleSound } = useSound();

  const handleOpenClick = () => {
    playLetterOpenSound();
    playSparkleSound();
    startMusic();

    // Trigger Heart Confetti Burst
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF6F91', '#FF9FBA', '#FFC8D8', '#FFFFFF']
    });

    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-hidden bg-gradient-to-b from-pink-100 via-pink-200 to-rose-200 dark:from-[#121026] dark:via-[#1D1730] dark:to-[#2E2248]"
        >
          {/* Background Sparkles & Twinkles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.2, scale: 0.8 }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 2 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="absolute text-pink-400 dark:text-pink-300 text-lg"
                style={{
                  top: `${(i * 17) % 95}%`,
                  left: `${(i * 23) % 95}%`,
                }}
              >
                {i % 2 === 0 ? '✨' : '💖'}
              </motion.div>
            ))}
          </div>

          {/* Main Cute Card Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.2 }}
            className="relative flex flex-col items-center text-center max-w-sm w-full p-8 rounded-3xl glass-pink shadow-cute-lg border-2 border-white/80 dark:border-pink-300/20"
          >
            {/* Top Ribbon & Cloud Badge */}
            <div className="absolute -top-6 px-4 py-1.5 bg-cute-rose text-white text-sm font-semibold rounded-full shadow-md flex items-center gap-1.5 tracking-wide">
              <span>🎀</span> A Special Gift For You <span>🎀</span>
            </div>

            {/* Heart Frame Photo with Soft Bounce Animation */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative my-6 group"
            >
              {/* Outer Decorative Heart Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity animate-pulse" />
              
              {/* Heart Shaped Mask Photo Wrapper */}
              <div className="relative w-44 h-44 rounded-full p-2 bg-white dark:bg-pink-900/60 shadow-inner flex items-center justify-center overflow-hidden border-4 border-pink-200 dark:border-pink-400/30">
                <img
                  src="/photos/1.jpg"
                  alt="Couple Heart"
                  className="w-full h-full object-cover rounded-full transform transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Heart Sticker Corner Badges */}
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-pink-900 p-2 rounded-full shadow-md text-cute-rose text-xl animate-bounce">
                💗
              </div>
              <div className="absolute -top-1 -left-2 bg-white dark:bg-pink-900 p-1.5 rounded-full shadow-md text-yellow-400 text-lg">
                ✨
              </div>
            </motion.div>

            {/* Title & Sweet Subtitle */}
            <h1 className="font-script text-4xl sm:text-5xl text-cute-rose dark:text-pink-300 mb-2 font-bold drop-shadow-sm">
              Sayangku 🎀
            </h1>
            <p className="text-gray-600 dark:text-pink-200 text-sm font-medium mb-6">
              "Ada sesuatu yang manis dan spesial yang udah aku siapin khusus untuk kamu..."
            </p>

            {/* Pill-shaped "Open 💗" Button */}
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 0 25px rgba(255, 111, 145, 0.7)" }}
              whileTap={{ scale: 0.94 }}
              onClick={handleOpenClick}
              className="px-8 py-3.5 bg-gradient-to-r from-cute-rose to-pink-400 text-white font-bold text-lg rounded-full shadow-cute flex items-center gap-3 transition-all duration-300 group cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin-slow" />
              <span>Open 💗</span>
              <Heart className="w-5 h-5 fill-current text-white group-hover:scale-125 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
