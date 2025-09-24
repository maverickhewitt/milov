import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import DOMPurify from 'dompurify';

export default function WishesForm({ slug, wed_client_id }) {
  const [wed_wishes, setWishes] = useState([]);
  const [wisher_name, setName] = useState('');
  const [wish_text, setWish] = useState('');
  const [honeypot, setHoneypot] = useState(''); 
  const [cooldown, setCooldown] = useState(false); 

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    const { data, error } = await supabase
      .from('wed_wishes')
      .select('*')
      .eq('wed_client_id', wed_client_id)
      .order('created_at', { ascending: false });

    if (!error) setWishes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot.trim() !== '') return;

    if (cooldown) return alert('Please wait before submitting again.');

    if (!wisher_name || !wish_text) return;

    const cleanName = DOMPurify.sanitize(wisher_name.trim());
    const cleanWish = DOMPurify.sanitize(wish_text.trim());

    const { error } = await supabase.from('wed_wishes').insert([
      {
        wed_client_id,
        wisher_name: cleanName,
        wish_text: cleanWish,
      }
    ]);

    if (!error) {
      setName('');
      setWish('');
      setCooldown(true);
      fetchWishes();

      setTimeout(() => setCooldown(false), 10000);
    }
  };

  return (
    <section className="bg-white py-12 px-6 text-center font-serif">
      <div className="bg-white max-w-2xl mx-auto p-8 rounded-3xl shadow-lg border border-gray-800">
        <div className="relative text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide relative inline-block">
            Leave a Wish
            <span className="relative block h-[4px] mt-2 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent animate-underlineGlow" />
            </span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mb-10">
          <input
            type="text"
            name="nickname"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />

          <input
            className="w-full p-3 rounded-xl border border-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Your Name"
            value={wisher_name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            className="w-full p-3 rounded-xl border border-gray-400 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Your Wish"
            rows={4}
            value={wish_text}
            onChange={(e) => setWish(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            disabled={cooldown}
            className={`w-full text-white py-3 rounded-xl font-medium shadow transition duration-200 ${
              cooldown ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {cooldown ? 'Please Wait...' : 'Send Wish'}
          </button>
        </form>

        <div className="relative">
          <h3 className="text-2xl font-semibold text-gray-600 mb-2 text-center sticky top-0 bg-white z-10">
            Guest Wishes
            <hr className="my-2 border-t border-gray-300" />
          </h3>
        </div>
        <div className="max-h-80 overflow-y-auto space-y-2">
          {wed_wishes.map((w, i) => (
            <div
              key={i}
              className="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm hover:shadow transition text-sm"
            >
              <div className="flex justify-between items-center mb-1">
                <p className="font-semibold text-gray-800">{w.wisher_name}</p>
                <span className="text-xs text-gray-500">
                  {new Date(w.created_at).toLocaleDateString("en-MY", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-gray-600 whitespace-pre-line text-left break-words">{w.wish_text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
