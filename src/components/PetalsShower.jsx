import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PetalsShower = ({ isActive, onClose }) => {
  const [petals, setPetals] = useState([]);

  useEffect(() => {
    if (isActive) {
      const items = Array.from({ length: 30 }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        size: Math.random() * 16 + 14,
        duration: Math.random() * 3 + 2.5,
        delay: Math.random() * 1.5,
        icon: i % 2 === 0 ? '🌸' : '🌺',
        rotate: Math.random() * 360,
      }));
      setPetals(items);

      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {petals.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: '-10vh', x: `${p.left}vw`, rotate: 0, opacity: 1 }}
            animate={{
              y: '105vh',
              x: `${p.left + (Math.random() - 0.5) * 20}vw`,
              rotate: p.rotate + 360,
              opacity: [1, 0.9, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeOut',
            }}
            className="absolute select-none"
            style={{ fontSize: `${p.size}px` }}
          >
            {p.icon}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
