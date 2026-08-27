import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useSound } from '../context/SoundContext';

export const MusicPlayer = () => {
  const { isPlaying, toggleMusic, volume, setVolume, playPopSound } = useSound();
  const [showVolume, setShowVolume] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      {/* Volume Slider & Song Title Bar (Pop out on hover / click) */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-pink shadow-md text-xs font-bold text-cute-rose dark:text-pink-300"
          >
            <span className="hidden sm:inline-block max-w-[200px] truncate text-[11px] font-semibold">
              🎵 Taylor Swift - Mine (Taylor's Version)
            </span>
            <button
              onClick={() => {
                setVolume(volume > 0 ? 0 : 0.4);
                playPopSound();
              }}
              className="text-cute-rose dark:text-pink-300 hover:scale-110 transition-transform"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-16 h-1.5 bg-pink-200 dark:bg-pink-900 rounded-lg appearance-none cursor-pointer accent-cute-rose"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Music Button */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative"
      >
        <button
          onClick={() => {
            playPopSound();
            toggleMusic();
          }}
          onMouseEnter={() => setShowVolume(true)}
          className={`relative flex items-center justify-center w-12 h-12 rounded-full shadow-cute transition-all duration-300 border-2 border-white dark:border-pink-300/30 ${
            isPlaying
              ? 'bg-gradient-to-r from-cute-rose to-pink-400 text-white'
              : 'bg-white/80 dark:bg-night-card/80 text-pink-400'
          }`}
          title={isPlaying ? "Pause Music" : "Play Romantic Music"}
        >
          {/* Animated Music Note / Disc */}
          <div className={`${isPlaying ? 'animate-spin-slow' : ''}`}>
            <Music className="w-5 h-5" />
          </div>

          {/* Glowing Equalizer Pulse Ring when Playing */}
          {isPlaying && (
            <span className="absolute inset-0 rounded-full bg-cute-rose opacity-40 animate-ping pointer-events-none" />
          )}
        </button>

        {/* Small Play/Pause State Badge */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-pink-900 rounded-full flex items-center justify-center shadow text-cute-rose text-xs">
          {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current ml-0.5" />}
        </div>
      </motion.div>
    </div>
  );
};
