import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only run on desktop pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Spawn subtle particle trail
      if (Math.random() < 0.3) {
        const icons = ['💗', '✨', '🌸', '💖', '⭐'];
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          icon: icons[Math.floor(Math.random() * icons.length)],
          size: Math.random() * 12 + 10,
          dx: (Math.random() - 0.5) * 20,
          dy: (Math.random() - 0.5) * 20 - 15,
        };

        setParticles(prev => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive-hover')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Remove old particles
  useEffect(() => {
    const timer = setInterval(() => {
      setParticles(prev => prev.slice(1));
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden custom-cursor">
      {/* Particle Trail */}
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute animate-float-particle opacity-80 transition-all duration-500 select-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            transform: `translate(${p.dx}px, ${p.dy}px)`,
          }}
        >
          {p.icon}
        </span>
      ))}

      {/* Main Cute Heart Cursor Pointer */}
      <div
        className={`fixed top-0 left-0 transition-transform duration-100 ease-out select-none flex items-center justify-center ${
          isHovered ? 'scale-150 text-cute-rose' : 'scale-100 text-pink-400'
        }`}
        style={{
          transform: `translate3d(${position.x - 12}px, ${position.y - 12}px, 0)`,
        }}
      >
        <span className="text-xl filter drop-shadow-md transition-transform duration-200">
          {isHovered ? '💖' : '💗'}
        </span>
      </div>
    </div>
  );
};
