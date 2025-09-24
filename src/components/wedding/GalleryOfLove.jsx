import { useEffect, useRef, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function GalleryOfLove({ galleryImages }) {
  const scrollRef = useRef(null);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true); // 👈 Track visibility

  function getPublicUrl(path) {
    if (!path) return "";
    const { data } = supabase.storage.from("ecard").getPublicUrl(path);
    return data?.publicUrl || "";
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if (scrollRef.current) {
      observer.observe(scrollRef.current);
    }

    return () => {
      if (scrollRef.current) observer.unobserve(scrollRef.current);
    };
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || galleryImages.length === 0) return;

    const imageWrapperEls = container.querySelectorAll(".gallery-item");

    const scrollToIndex = (index) => {
      const el = imageWrapperEls[index];
      if (el && container) {
        const left = el.offsetLeft - container.offsetLeft;
        container.scrollTo({ left, behavior: "smooth" });
      }
    };

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        currentIndexRef.current += 1;
        if (currentIndexRef.current >= galleryImages.length) {
          currentIndexRef.current = 0;
        }
        scrollToIndex(currentIndexRef.current);
      }, 3000);
    };

    const stopAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    if (isVisible) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }

    return () => stopAutoScroll();
  }, [galleryImages, isVisible]);

  return (
    <section className="bg-white py-14 px-6 font-serif">
      <div className="relative text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide relative inline-block">
          Gallery Of Love
          <span className="relative block h-[4px] mt-2 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent animate-underlineGlow" />
          </span>
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-thumb-[#d3c0b0] scrollbar-track-transparent"
      >
        <div className="flex w-max">
          {galleryImages.map((imgPath, index) => (
            <div
              key={index}
              className="gallery-item snap-start flex-shrink-0 w-[90vw] sm:w-[70vw] md:w-[60vw] px-2"
            >
              <img
                src={getPublicUrl(imgPath)}
                alt={`Gallery ${index + 1}`}
                className="w-full aspect-[3/2] object-cover rounded-xl shadow-md"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
