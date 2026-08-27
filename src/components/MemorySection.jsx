import React from 'react';
import { motion } from 'framer-motion';
import { coupleData } from '../data/romanticData';
import { Sparkles, Calendar, BookOpen } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const MemorySection = ({ onOpenPhoto }) => {
  const { playPopSound } = useSound();

  return (
    <section id="memories" className="py-20 px-4 max-w-5xl mx-auto relative z-10">
      {/* Title Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pink shadow-sm mb-3"
        >
          <BookOpen className="w-4 h-4 text-cute-rose" />
          <span className="text-xs font-bold text-cute-rose uppercase tracking-widest">Digital Scrapbook</span>
        </motion.div>

        <h2 className="font-script text-4xl sm:text-6xl text-cute-rose dark:text-pink-300 font-bold mb-3">
          Our Memory Scrapbook 🌸
        </h2>
        <p className="text-gray-600 dark:text-pink-200 text-sm sm:text-base max-w-md mx-auto">
          Setiap jejak dan cerita manis yang sudah kita lewati bersama.
        </p>
      </div>

      {/* Timeline Story Memory Cards */}
      <div className="relative space-y-12 sm:space-y-16">
        {/* Vertical Center Line */}
        <div className="hidden sm:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-pink-200 via-rose-300 to-pink-200 dark:from-pink-900 dark:via-purple-800 dark:to-pink-900 rounded-full" />

        {coupleData.memories.map((memory, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className={`relative flex flex-col sm:flex-row items-center ${
                isEven ? 'sm:flex-row-reverse' : ''
              } gap-6 sm:gap-12`}
            >
              {/* Timeline Center Heart Badge Node */}
              <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-pink-900 border-4 border-cute-rose shadow-md items-center justify-center text-sm font-bold">
                {memory.sticker}
              </div>

              {/* Memory Card Content Box */}
              <div className="w-full sm:w-1/2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  onClick={playPopSound}
                  className={`relative p-6 rounded-3xl glass-card shadow-cute border-2 border-white/80 dark:border-pink-300/20 bg-gradient-to-br ${memory.bgGradient}`}
                >
                  {/* Decorative Scrapbook Tape */}
                  <div className="tape-top-left" />

                  {/* Header Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3.5 py-1 bg-white/90 dark:bg-pink-950/90 text-cute-rose font-bold text-xs rounded-full shadow-sm">
                      {memory.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-script text-2xl sm:text-3xl font-bold text-cute-rose dark:text-pink-200 mb-2">
                    {memory.title}
                  </h3>

                  <p className="text-gray-700 dark:text-pink-100 text-sm leading-relaxed mb-4">
                    {memory.description}
                  </p>

                  {/* Photo Preview inside Memory Card - Proportional 4:3 Aspect Ratio */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenPhoto) onOpenPhoto(memory.imageIndex);
                    }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-4 border-white dark:border-pink-900 bg-pink-50 cursor-pointer group/photo"
                  >
                    <img
                      src={memory.image}
                      alt={memory.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/photo:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-end justify-between p-3 text-white text-xs font-semibold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" /> Klik untuk perbesar
                      </span>
                      <span className="bg-white/30 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                        4:3 📸
                      </span>
                    </div>
                  </div>

                  {/* Cute Sticker */}
                  <div className="absolute -bottom-3 -right-3 text-3xl animate-bounce">
                    {memory.sticker}
                  </div>
                </motion.div>
              </div>

              {/* Spacer for Alternate Side */}
              <div className="hidden sm:block w-1/2" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
