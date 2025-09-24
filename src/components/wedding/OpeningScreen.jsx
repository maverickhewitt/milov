import { useState } from 'react';
import WeddingCard from './WeddingCard.jsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function OpeningScreen() {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    const audio = document.getElementById('wedding-audio');
    if (audio) {
      audio.play().catch(() => {});
    }
    setOpened(true);
  };

  return (
    <AnimatePresence mode="wait">
      {!opened ? (
        <motion.div
          key="opening"
          className="relative w-full h-screen bg-black font-serif"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <img
            src="/product/wedding/1.png"
            alt="Cover"
            className="w-full h-full object-cover brightness-[.5]"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-xl md:text-2xl font-light tracking-wide">
              The Wedding Of
            </h1>
            <h2 className="text-white text-4xl md:text-6xl font-extrabold mt-2 tracking-wider">
              Adam & Eve
            </h2>
            <button
              onClick={handleOpen}
              className="mt-6 border border-gray-200 text-white px-6 py-2 rounded-2xl text-lg font-semibold shadow-lg hover:text-gray-300 transition"
            >
              Click to Open Invitation
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="wedding"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <WeddingCard />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
