import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicControl({ songPath }) {
  const [isMuted, setIsMuted] = useState(false);
  const [songUrl, setSongUrl] = useState(null);

  useEffect(() => {
    const getPublicUrl = async () => {
      if (!songPath) return;

      const { data, error } = supabase.storage.from('ecard').getPublicUrl(songPath);
      if (!error) {
        setSongUrl(data.publicUrl);
      }
    };

    getPublicUrl();
  }, [songPath]);

  useEffect(() => {
    const audio = document.getElementById('wedding-audio');
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  }, [songUrl]);

  const toggleMute = () => {
    const audio = document.getElementById('wedding-audio');
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  if (!songUrl) return null; 

  return (
    <>
      <audio id="wedding-audio" loop autoPlay hidden>
        <source src={songUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button
        onClick={toggleMute}
        className="fixed bottom-6 left-6 z-50 bg-white rounded-full shadow-lg p-3 transition hover:scale-110 opacity-80"
      >
        {isMuted ? <VolumeX className="text-gray-700" /> : <Volume2 className="text-gray-700" />}
      </button>
    </>
  );
}
