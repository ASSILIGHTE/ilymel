import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useSound } from '../context/SoundContext';

export const Navbar = ({ activeSection, setActiveSection }) => {
  const { isNightMode, toggleTheme } = useTheme();
  const { playPopSound } = useSound();

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'memories', label: 'Memories', icon: '💗' },
    { id: 'gallery', label: 'Gallery', icon: '📸' },
    { id: 'letter', label: 'Letter', icon: '💌' },
  ];

  const handleNavClick = (id) => {
    playPopSound();
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Floating Glass Header (Desktop & Mobile) */}
      <header className="fixed top-4 left-4 sm:left-1/2 sm:-translate-x-1/2 z-40">
        <nav className="px-4 py-2 rounded-full glass-pink shadow-cute border border-white/80 dark:border-pink-300/20 flex items-center gap-3">
          {/* Logo Brand / Greeting */}
          <div className="flex items-center gap-1.5 text-cute-rose dark:text-pink-300 font-script font-bold text-xl px-2">
            <span>Sayangku</span>
            <span className="text-sm animate-bounce">🎀</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-cute-rose text-white shadow-sm'
                    : 'text-gray-600 dark:text-pink-200 hover:bg-pink-100 dark:hover:bg-pink-900/40'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Day / Night Dreamy Mode Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playPopSound();
              toggleTheme();
            }}
            className="p-2 rounded-full bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 hover:bg-pink-200 transition-colors shadow-inner"
            title={isNightMode ? "Switch to Day Mode ☀️" : "Switch to Dreamy Night 🌙"}
          >
            <span className="text-base">{isNightMode ? '🌙' : '☀️'}</span>
          </motion.button>
        </nav>
      </header>

      {/* Mobile Floating Bottom Bar (Glassmorphism) */}
      <div className="sm:hidden fixed bottom-4 left-4 right-4 z-40">
        <nav className="px-6 py-2.5 rounded-full glass-pink shadow-cute-lg border border-white/90 dark:border-pink-300/30 flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center gap-0.5 text-xs font-semibold transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-cute-rose dark:text-pink-300 scale-110 font-bold'
                  : 'text-gray-500 dark:text-pink-200/70'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
