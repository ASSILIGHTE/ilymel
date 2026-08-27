import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { SoundProvider } from './context/SoundContext';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { CustomCursor } from './components/CustomCursor';
import { OpeningScreen } from './components/OpeningScreen';
import { Navbar } from './components/Navbar';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { MemorySection } from './components/MemorySection';
import { PhotoGallery } from './components/PhotoGallery';
import { LoveLetterSection } from './components/LoveLetterSection';
import { PetalsShower } from './components/PetalsShower';
import { FooterSection } from './components/FooterSection';

export const AppContent = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showPetalsShower, setShowPetalsShower] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  return (
    <div className="relative min-h-screen selection:bg-cute-rose selection:text-white">
      {/* Background Floating Canvas */}
      <BackgroundCanvas />

      {/* Desktop Pink Custom Heart Cursor */}
      <CustomCursor />

      {/* Falling Petals Effect Triggered by Magic Flower */}
      <PetalsShower
        isActive={showPetalsShower}
        onClose={() => setShowPetalsShower(false)}
      />

      {/* Fullscreen Splash Opening Screen */}
      {!isUnlocked ? (
        <OpeningScreen onOpen={() => setIsUnlocked(true)} />
      ) : (
        /* Main Page Content Revealed after Opening */
        <div className="relative z-10 animate-fadeIn">
          {/* Header Navigation & Music Controls */}
          <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
          <MusicPlayer />

          {/* Main Sections */}
          <main>
            <HeroSection onTriggerPetals={() => setShowPetalsShower(true)} />
            <MemorySection onOpenPhoto={(index) => setSelectedPhotoIndex(index)} />
            <PhotoGallery
              selectedPhotoIndex={selectedPhotoIndex}
              setSelectedPhotoIndex={setSelectedPhotoIndex}
            />
            <LoveLetterSection />
          </main>

          {/* Footer Section */}
          <FooterSection />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </ThemeProvider>
  );
}
