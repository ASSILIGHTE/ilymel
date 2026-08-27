import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4); // Medium soft default
  
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  useEffect(() => {
    // Initialize audio element with Taylor Swift - Mine (Taylor's Version)
    audioRef.current = new Audio('/mine.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Sync volume state to Audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Audio autoplay blocked or failed", e);
      });
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // Sound Effects Generators (Web Audio API Synthesizer)
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const playPopSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15 * volume, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  };

  const playSparkleSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const notes = [1046.50, 1318.51, 1567.98, 2093.00];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.08 * volume, ctx.currentTime + idx * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.04 + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.04);
        osc.stop(ctx.currentTime + idx * 0.04 + 0.2);
      });
    } catch (e) {}
  };

  const playLetterOpenSound = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2 * volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  };

  return (
    <SoundContext.Provider value={{
      isPlaying,
      volume,
      setVolume,
      startMusic,
      stopMusic,
      toggleMusic,
      playPopSound,
      playSparkleSound,
      playLetterOpenSound,
      songTitle: "Taylor Swift - Mine (Taylor's Version)"
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
