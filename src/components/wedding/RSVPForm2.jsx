import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import DOMPurify from 'dompurify';

export default function RSVPForm2({ wed_client_id, slug }) {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    let timer;
    if (cooldown) {
      timer = setTimeout(() => setCooldown(false), 10000); 
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleRSVP = async (e) => {
    e.preventDefault();

    if (honeypot !== '') {
      console.warn('Bot submission blocked.');
      return;
    }

    if (!name || cooldown) return;

    const cleanName = DOMPurify.sanitize(name);

    const { error } = await supabase.from('etsy_wed_rsvp').insert([
      {
        wed_client_id,
        slug,
        guest_name: cleanName,
        attending,
      },
    ]);

    if (error) {
      console.error('RSVP submission error:', error.message);
      return;
    }

    setSubmitted(true);
    setName('');
    setAttending('yes');
    setCooldown(true); 
  };

  return (
    <section className="relative w-full py-12 px-6 text-center font-serif">
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/40" /> */}

      {/* Content */}
      <div className="relative z-10">
        <div className="bg-white/85 max-w-2xl mx-auto p-8 rounded-3xl shadow-lg border border-gray-200">
        <div className="relative text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-wide relative inline-block">
            Will You Attend?
            <span className="relative block h-[4px] mt-2 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent animate-underlineGlow" />
            </span>
          </h2>
        </div>
          {submitted ? (
              <div className="space-y-4">
                <p className="text-gray-500 text-lg font-medium">Thank you for your response!</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-xl transition"
                >
                  Submit another RSVP
                </button>
              </div>
            ) : (
              <form onSubmit={handleRSVP} className="space-y-5">
                <input
                  type="text"
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />

                <input
                  className="w-full p-3 rounded-xl border border-gray-400 bg-white text-[#4e342e] shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <select
                  className="w-full p-3 rounded-xl border border-gray-400 bg-white text-[#4e342e] shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                  value={attending}
                  onChange={(e) => setAttending(e.target.value)}
                >
                  <option value="yes">I will attend</option>
                  <option value="no">I can't make it</option>
                </select>

                <button
                  type="submit"
                  disabled={cooldown}
                  className={`w-full py-3 rounded-xl shadow transition duration-200 ${
                    cooldown ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {cooldown ? 'Please wait...' : 'Submit RSVP'}
                </button>
              </form>
              )}
        </div>
      </div>
    </section>
  );
}
