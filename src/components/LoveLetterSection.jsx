import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { coupleData } from '../data/romanticData';
import { useSound } from '../context/SoundContext';
import { Mail, Heart, Sparkles, Edit3, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoveLetterSection = () => {
  const { playLetterOpenSound, playSparkleSound, playPopSound } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [letterContent, setLetterContent] = useState(coupleData.defaultLetter);
  const [isEditing, setIsEditing] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpen) return;

    playLetterOpenSound();
    playSparkleSound();
    setIsOpen(true);

    // Heart explosion confetti
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF6F91', '#FF9FBA', '#FFC8D8', '#FFFFFF']
    });
  };

  const handleSaveEdit = () => {
    playPopSound();
    setIsEditing(false);
  };

  return (
    <section id="letter" className="py-20 px-4 max-w-4xl mx-auto relative z-10">
      {/* Title Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pink shadow-sm mb-3"
        >
          <Mail className="w-4 h-4 text-cute-rose" />
          <span className="text-xs font-bold text-cute-rose uppercase tracking-widest">Special Message</span>
        </motion.div>

        <h2 className="font-script text-4xl sm:text-6xl text-cute-rose dark:text-pink-300 font-bold mb-3">
          Love Letter 💌
        </h2>
        <p className="text-gray-600 dark:text-pink-200 text-sm sm:text-base max-w-md mx-auto">
          Klik amplop pink di bawah ini untuk membuka pesan manis khusus untuk kamu!
        </p>
      </div>

      {/* Interactive Envelope Container */}
      <div className="relative flex flex-col items-center justify-center min-h-[420px]">
        
        {/* Envelope Visual */}
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEnvelopeClick}
            className="relative cursor-pointer max-w-md w-full aspect-[1.5/1] bg-gradient-to-br from-pink-300 via-rose-300 to-pink-400 rounded-3xl shadow-cute-lg border-4 border-white dark:border-pink-300/30 flex flex-col items-center justify-center p-6 text-center select-none"
          >
            {/* Top Triangular Flap Decoration */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-pink-200 to-pink-300 rounded-t-3xl border-b-2 border-pink-400/30 clip-path-triangle" />

            {/* Envelope Heart Wax Seal Button */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-cute-rose text-white flex items-center justify-center shadow-lg border-4 border-white animate-pulse">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <span className="font-script text-2xl font-bold text-white drop-shadow">
                Click To Open 💗
              </span>
              <span className="text-xs text-white/90 font-semibold bg-white/20 px-3 py-1 rounded-full">
                Strictly For Sayang 🎀
              </span>
            </div>

            {/* Sparkle Badges */}
            <span className="absolute top-4 left-6 text-2xl text-yellow-200 animate-bounce">✨</span>
            <span className="absolute bottom-4 right-6 text-2xl text-pink-100 animate-pulse">🌸</span>
          </motion.div>
        ) : (
          /* Opened Letter Document Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="relative max-w-xl w-full bg-cute-cream dark:bg-pink-950 p-6 sm:p-10 rounded-3xl shadow-cute-lg border-4 border-pink-200 dark:border-pink-800"
          >
            {/* Scrapbook Tape & Stamp */}
            <div className="tape-top-left" />
            <div className="tape-top-right" />

            {/* Edit Letter Button */}
            <button
              onClick={() => {
                playPopSound();
                setIsEditing(!isEditing);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-pink-100 dark:bg-pink-900 text-cute-rose hover:scale-110 transition-transform text-xs font-bold flex items-center gap-1 shadow-sm"
              title="Edit Letter Text"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? "Cancel" : "Edit Letter"}</span>
            </button>

            {/* Letter Editable Form vs Normal View */}
            {!isEditing ? (
              <div className="space-y-4">
                <div className="border-b border-pink-200 dark:border-pink-800 pb-3">
                  <h3 className="font-body text-2xl sm:text-3xl font-bold text-cute-rose dark:text-pink-300">
                    {letterContent.greeting}
                  </h3>
                </div>

                <div className="font-body text-base sm:text-lg text-gray-800 dark:text-pink-100 font-medium leading-relaxed whitespace-pre-line py-4 px-5 bg-pink-50/70 dark:bg-pink-900/40 rounded-2xl border border-pink-200/80 dark:border-pink-800/50 shadow-inner">
                  {letterContent.body}
                </div>

                <div className="border-t border-pink-200 dark:border-pink-800 pt-4 text-right">
                  <p className="text-xs text-gray-500 dark:text-pink-300 font-medium italic">{letterContent.closing}</p>
                  <p className="font-body text-xl sm:text-2xl font-bold text-cute-rose dark:text-pink-300 mt-1">
                    {letterContent.sender}
                  </p>
                </div>
              </div>
            ) : (
              /* Editable Live Preview Mode */
              <div className="space-y-4 text-left">
                <h4 className="font-bold text-sm text-cute-rose uppercase tracking-wider">
                  Edit Personal Love Letter ✏️
                </h4>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Salam Pembuka:</label>
                  <input
                    type="text"
                    value={letterContent.greeting}
                    onChange={(e) => setLetterContent({ ...letterContent, greeting: e.target.value })}
                    className="w-full p-2 text-sm rounded-xl border border-pink-300 bg-white dark:bg-pink-900 text-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Isi Surat Cinta:</label>
                  <textarea
                    rows={6}
                    value={letterContent.body}
                    onChange={(e) => setLetterContent({ ...letterContent, body: e.target.value })}
                    className="w-full p-3 text-sm rounded-xl border border-pink-300 bg-white dark:bg-pink-900 text-gray-800 dark:text-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">Nama Pengirim:</label>
                  <input
                    type="text"
                    value={letterContent.sender}
                    onChange={(e) => setLetterContent({ ...letterContent, sender: e.target.value })}
                    className="w-full p-2 text-sm rounded-xl border border-pink-300 bg-white dark:bg-pink-900 text-gray-800 dark:text-white"
                  />
                </div>

                <button
                  onClick={handleSaveEdit}
                  className="w-full py-2.5 bg-cute-rose text-white font-bold rounded-xl shadow flex items-center justify-center gap-2 hover:bg-cute-deep transition-colors"
                >
                  <Check className="w-4 h-4" /> Simpan Surat 💗
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
