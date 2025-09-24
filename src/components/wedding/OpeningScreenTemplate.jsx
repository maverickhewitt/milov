import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardTemplate from "./CardTemplate.jsx";
import CardTemplate2 from "./CardTemplate2.jsx"; 
import { supabase } from "../../supabaseClient";

export default function OpeningScreenTemplate({ wed_clients }) {
  function getPublicUrl(path) {
    if (!path) return "";
    const { data } = supabase.storage.from("ecard").getPublicUrl(path);
    return data?.publicUrl || "";
  }

  useEffect(() => {
    if (wed_clients?.img_1) {
      getPublicUrl(wed_clients.img_1);
    }
  }, [wed_clients]);

  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    const audio = document.getElementById("wedding-audio");
    if (audio) {
      audio.play().catch(() => {});
    }
    setOpened(true);
  };

  //Mapping design numbers to components
  const designComponents = {
    1: CardTemplate,
    2: CardTemplate2,
    // 3: CardTemplate3,  
    // 4: CardTemplate4,
  };

  const SelectedTemplate =
    designComponents[wed_clients?.design] || CardTemplate; 

  return (
    <AnimatePresence mode="wait">
      {!opened ? (
        <motion.div
          key="opening"
          className="relative w-full h-screen bg-black font-serif"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            src={getPublicUrl(wed_clients.image_url)}
            alt={`${wed_clients.names} Image Cover`}
            className="w-full h-full object-cover brightness-[.5]"
          />
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-xl md:text-2xl font-light tracking-wide"
            >
              Wedding Invitation From
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-4xl md:text-6xl font-extrabold mt-2 tracking-wider"
            >
              {wed_clients.names}
            </motion.h2>
            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 border border-gray-200 text-white px-6 py-2 rounded-2xl text-lg shadow-lg hover:text-gray-300 transition"
            >
              Click to Open Invitation
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="wedding"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Dynamically render the selected template */}
          <SelectedTemplate wed_clients={wed_clients} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
