import Countdown from "./Countdown";
import WishesForm from "./WishesForm";
import RSVPForm from "./RSVPForm";
import MusicControl from "./MusicControl.jsx"
import GalleryOfLove from "./GalleryOfLove";
import LoveJourney from "./LoveJourney.jsx";
import WeddingGift from "./WeddingGift.jsx";
import DressCode from "./DressCode.jsx";
import Footer from "./Footer.jsx";
import UnpaidNotice from "./UnpaidNotice.jsx";
import { Church, GlassWater, ClipboardCopy } from "lucide-react";
import { FiCopy, FiCheck } from 'react-icons/fi';
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient.js";

function CardTemplate({wed_clients}){

  const galleryKeys = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10'];

  const galleryImages = galleryKeys
  .map((key) => wed_clients[key])
  .filter((url) => url !== null && url !== '');

  function getPublicUrl(path) {
    if (!path) return "";
    const { data } = supabase.storage.from("ecard").getPublicUrl(path);
    return data?.publicUrl || "";
  }

  function formatDateWithOrdinal(dateString) {
  const date = new Date(dateString)

  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'long' })
  const year = date.toLocaleString('default', { year: 'numeric' })

  const getOrdinal = (n) => {
    if (n > 3 && n < 21) return 'th'
    switch (n % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  return `${day}${getOrdinal(day)} ${month} ${year}`
  }

  useEffect(() => {
    document.title = `Wedding | ${wed_clients.names}`;
  }, []);

  const [copied, setCopied] = useState('');
  const packageName = wed_clients?.package?.toLowerCase(); // e.g., 'silver', 'gold', 'diamond'

  const features = {
    silver: {
      countdown: true,
      dressCode: false,
      rsvp: false,
      wishes: false,
      gift: false,
      gallery: false,
      loveJourney: false,
      music: true,
      dashboardRSVP: false,
      dashboardWishes: false,
    },
    gold: {
      countdown: true,
      dressCode: true,
      rsvp: true,
      wishes: false,
      gift: false,
      gallery: true,
      loveJourney: false,
      music: true,
      dashboardRSVP: true,
      dashboardWishes: false,
    },
    diamond: {
      countdown: true,
      dressCode: true,
      rsvp: true,
      wishes: true,
      gift: true,
      gallery: true,
      loveJourney: true,
      music: true,
      dashboardRSVP: true,
      dashboardWishes: true,
    },
  };

  const handleCopy = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(accountNumber);
    setTimeout(() => setCopied(''), 2000);
  };

  return(
    <div>
      {features[packageName]?.music && (
        <>
          <MusicControl songPath={wed_clients.song} />
        </>
      )}
      {wed_clients?.paid_status === "unpaid" && <UnpaidNotice />}
      <section className="relative w-screen h-screen font-serif">
        <img 
          src={getPublicUrl(wed_clients.image_url)}
          alt={`${wed_clients.names} Main Image`}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

        {/* Centered Content */}
       <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-white text-lg md:text-2xl font-light tracking-[0.2em] uppercase drop-shadow-sm">
          The Wedding Of
        </h1>
        <h2 className="text-white text-4xl md:text-7xl font-extrabold mt-3 tracking-widest drop-shadow-lg">
          {wed_clients.names}
        </h2>
        <h1 className="mt-4 text-white text-lg md:text-2xl font-light tracking-[0.2em] drop-shadow-sm">
        {formatDateWithOrdinal(wed_clients.date)}
      </h1>
      </div>

      </section>

      <section className="bg-white py-20 px-6 font-serif">
        <div className="relative text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide relative inline-block">
            Bride & Groom
            <span className="relative block h-[4px] mt-2 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent animate-underlineGlow" />
            </span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto mx-auto">
          <div className="black-border-glow w-full bg-white border border-gray-200 shadow-md rounded-3xl p-8 flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-900">{wed_clients.groom_name}</h3>
            <p className="text-gray-600 mt-2 text-center">
              Son of <br /> {wed_clients.parents_groom}
            </p>

            <h3 className="my-8 text-2xl font-semibold text-gray-900">&</h3>

            <h3 className="text-2xl font-semibold text-gray-900">{wed_clients.bride_name}</h3>
            <p className="text-gray-600 mt-2 text-center">
              Daughter of <br /> {wed_clients.parents_bride}
            </p>
          </div>
        </div>
      </section>


      <hr className="my-10 border-t border-gray-300 opacity-30" />

      <section className="bg-white py-16 px-4 flex flex-col items-center justify-center font-serif">
        <div className="relative text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide relative inline-block">
            Date Time & Venue
            <span className="relative block h-[4px] mt-2 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent animate-underlineGlow" />
            </span>
          </h2>
        </div>
        <div className="black-border-glow bg-white border border-gray-200 shadow-md rounded-3xl max-w-2xl mx-auto w-full pt-8 pb-12 p-6 sm:p-10 text-center space-y-12">

          {/* Date + Countdown */}
          <div className="space-y-4">
            {wed_clients?.date && (
              <h3 className="text-3xl font-bold text-gray-800">
                {new Date(wed_clients.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                })}
                <br />
                {new Date(wed_clients.date).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>
            )}
            <Countdown targetDate={`${wed_clients.date}T00:00:00`} />
          </div>

            {/* Holy Matrimony */}
            {(wed_clients.time_1 || wed_clients.venue_1 || wed_clients.venue_1_link) && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Holy Matrimony</h4>
                {wed_clients.time_1 && <p className="text-lg">{wed_clients.time_1}</p>}
                {wed_clients.venue_1 && <p className="text-lg font-medium">{wed_clients.venue_1}</p>}
                {wed_clients.venue_1_link && (
                  <div className="flex justify-center mt-2">
                    <iframe
                      src={wed_clients.venue_1_link}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg max-w-md w-full shadow-md"
                    ></iframe>
                  </div>
                )}
              </div>
            )}

            {/* Divider only if both exist */}
            {(wed_clients.venue_1 && wed_clients.venue_2) && (
              <hr className="my-10 border-t border-gray-400 opacity-60" />
            )}

            {/* Wedding Reception */}
            {(wed_clients.time_2 || wed_clients.venue_2 || wed_clients.venue_2_link) && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Wedding Reception</h4>
                {wed_clients.time_2 && <p className="text-lg">{wed_clients.time_2}</p>}
                {wed_clients.venue_2 && <p className="text-lg font-medium">{wed_clients.venue_2}</p>}
                {wed_clients.venue_2_link && (
                  <div className="flex justify-center mt-2">
                    <iframe
                      src={wed_clients.venue_2_link}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg max-w-md w-full shadow-md"
                    ></iframe>
                  </div>
                )}
              </div>
            )}
        </div>
      </section>

      <hr className="my-10 border-t border-gray-300 opacity-30" />

      {features[packageName]?.dressCode && (
        <>
          <DressCode wed_clients={wed_clients} />
          <hr className="my-10 border-t border-gray-300 opacity-30" />
        </>
      )}

      {features[packageName]?.gallery && (
        <>
          <GalleryOfLove galleryImages={galleryImages} />
          <hr className="my-10 border-t border-gray-300 opacity-30" />
        </>
      )}

      {features[packageName]?.loveJourney && (
        <>
          <LoveJourney wed_clients={wed_clients} getPublicUrl={getPublicUrl} />
          <hr className="my-10 border-t border-gray-300 opacity-30" />
        </>
      )}
      
      <section className="bg-white py-16 px-6 text-center ">
        <div className="black-border-glow max-w-2xl mx-auto bg-white rounded-3xl shadow-md px-8 py-10 relative">
    
          <p className="text-xl italic text-gray-600 leading-relaxed z-10 relative">
          “{wed_clients.verse_desc}”
          <br />
          <span className="text-sm not-italic block mt-4">— {wed_clients.verse_title}</span>
          </p>
        </div>
      </section>

      <hr className="my-10 border-t border-gray-300 opacity-30" />

      {features[packageName]?.gift && (
        <>
          <WeddingGift wed_clients={wed_clients} />
          <hr className="my-10 border-t border-gray-300 opacity-30" />
        </>
      )}

      <section>
        {features[packageName]?.rsvp && (
          <RSVPForm 
            wed_client_id={wed_clients.wed_client_id} 
            slug={wed_clients.slug}
          />
        )}
        {features[packageName]?.wishes && (
          <WishesForm 
            slug={wed_clients.slug} 
            wed_client_id={wed_clients.wed_client_id} 
          />
        )}
      </section>
  
      <Footer/>
    </div>
  );
}

export default CardTemplate