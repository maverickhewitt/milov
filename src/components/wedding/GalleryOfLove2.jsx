import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/zoom";
import { supabase } from "../../supabaseClient";

// Utility function to get Supabase public URL
function getPublicUrl(path) {
  if (!path) return "";
  const { data } = supabase.storage.from("ecard").getPublicUrl(path);
  return data?.publicUrl || "";
}

export default function GalleryOfLove2({ galleryImages }) {
  const [isOpen, setIsOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  return (
    <section className="relative w-full py-14 px-6 text-center font-serif">
      <h2 className="mb-6 text-3xl md:text-4xl font-extrabold text-white tracking-wide">
        Gallery of Love
      </h2>

      {/* Main Gallery Swiper */}
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={2}
        spaceBetween={20}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        pagination={{ el: ".custom-pagination", clickable: true }}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 5 },
          768: { slidesPerView: 2, spaceBetween: 20 },
        }}
        className="w-full max-w-3xl mx-auto"
      >
        {galleryImages.map((imgPath, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-60 sm:h-72 md:h-80 w-full flex items-center justify-center 
              rounded-xl border border-gray-300 bg-white/80 overflow-hidden cursor-pointer"
              onClick={() => {
                setStartIndex(index);
                setIsOpen(true);
              }}
            >
              <img
                src={getPublicUrl(imgPath)}
                alt={`Gallery ${index + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination below */}
      <div className="custom-pagination mt-4 flex justify-center
        [&_.swiper-pagination-bullet]:mx-2 
        [&_.swiper-pagination-bullet]:!bg-gray-900 
        [&_.swiper-pagination-bullet-active]:!bg-white">
      </div>

      {/* Fullscreen Lightbox */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-6 text-white text-3xl z-50"
          >
            ✕
          </button>

          <Swiper
            modules={[Navigation, Pagination, Zoom]}
            navigation
            pagination={{ clickable: true }}
            zoom
            initialSlide={startIndex}
            className="w-full h-full 
              [&_.swiper-button-next]:!text-white 
              [&_.swiper-button-prev]:!text-white 
              [&_.swiper-pagination-bullet]:!bg-white"
          >
            {galleryImages.map((imgPath, index) => (
              <SwiperSlide key={index}>
                <div className="swiper-zoom-container flex items-center justify-center w-full h-full">
                  <img
                    src={getPublicUrl(imgPath)}
                    alt={`Fullscreen ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
