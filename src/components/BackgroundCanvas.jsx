import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const BackgroundCanvas = () => {
  const { isNightMode } = useTheme();

  // Floating background items configuration
  const floatingItems = useMemo(() => {
    const items = ['💗', '✨', '🌸', '☁️', '⭐', '💖', '🧸', '🎀', '🌸', '💫'];
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      icon: items[i % items.length],
      size: Math.floor(Math.random() * 16) + 16,
      left: Math.random() * 100,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      initialY: Math.random() * 100,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 transition-colors duration-1000 ${
          isNightMode
            ? 'bg-gradient-to-b from-[#0F0C1B] via-[#1D1730] to-[#2E2248]'
            : 'bg-gradient-to-b from-[#FFE4EC] via-[#FFF0F5] to-[#FFC8D8]'
        }`}
      />

      {/* Night Mode Crescent Moon & Stars Glow */}
      {isNightMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-12 right-12 text-6xl text-yellow-100 filter drop-shadow-night-glow opacity-90 hidden sm:block"
        >
          🌙
          <div className="absolute top-2 -left-4 text-sm animate-pulse">✨</div>
          <div className="absolute bottom-1 right-8 text-xs animate-ping">⭐</div>
        </motion.div>
      )}

      {/* Floating Animated Icons */}
      {floatingItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: `${item.initialY}vh`, opacity: 0.2 }}
          animate={{
            y: ['105vh', '-10vh'],
            x: [0, (item.id % 2 === 0 ? 30 : -30), 0],
            rotate: [0, item.id % 2 === 0 ? 45 : -45, 0],
            opacity: [0, 0.7, 0.8, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          className="absolute"
          style={{
            left: `${item.left}%`,
            fontSize: `${item.size}px`,
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Soft Light Overlay Glow Bubbles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-pink-300/20 dark:bg-purple-600/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-rose-300/20 dark:bg-pink-500/15 rounded-full blur-3xl" />
      <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-purple-200/20 dark:bg-indigo-600/15 rounded-full blur-3xl" />
    </div>
  );
};
