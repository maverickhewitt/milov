import { FiCopy, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

function WeddingGift({ wed_clients }) {
  const [copied, setCopied] = useState('');

  const handleCopy = (accountNumber) => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(accountNumber);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section className="bg-white py-14 px-6 font-serif">
      <div className="relative text-center mb-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide relative inline-block">
          Wedding Gift
          <span className="relative block h-[4px] mt-2 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent animate-underlineGlow" />
          </span>
        </h2>
      </div>
      <p className="text-gray-600 text-center mb-8">
        Your presence is the greatest gift,
        <br />
        but if you wish to share more...
      </p>

      <div className="flex justify-center">
        <div className="black-border-glow bg-white pt-6 pb-8 px-6 rounded-3xl shadow-lg w-full max-w-2xl mx-auto">
          {/* Groom */}
          <img
            src={wed_clients.bacc_1_logo}
            alt={wed_clients.bacc_1_name}
            className="w-16 mx-auto mb-3"
          />
          <p className="text-gray-600 text-lg text-center mb-1">{wed_clients.groom_name}</p>
          <div className="flex justify-center items-center gap-2 mb-6">
            <p className="text-gray-800 font-mono text-xl tracking-wide">{wed_clients.bacc_1}</p>
            <button
              onClick={() => handleCopy(`${wed_clients?.bacc_1}`)}
              className="text-gray-600 hover:text-gray-700 transition"
              title="Copy account number"
            >
              {copied === `${wed_clients?.bacc_1}` ? <FiCheck size={20} /> : <FiCopy size={20} />}
            </button>
          </div>

          <hr className="my-6 border-t border-gray-400 opacity-30" />

          {/* Bride */}
          <img
            src={wed_clients.bacc_2_logo}
            alt={wed_clients.bacc_2_name}
            className="w-16 mx-auto mb-3"
          />
          <p className="text-gray-600 text-lg text-center mb-1">{wed_clients.bride_name}</p>
          <div className="flex justify-center items-center gap-2">
            <p className="text-gray-800 font-mono text-xl tracking-wide">{wed_clients.bacc_2}</p>
            <button
              onClick={() => handleCopy(`${wed_clients?.bacc_2}`)}
              className="text-gray-600 hover:text-gray-700 transition"
              title="Copy account number"
            >
              {copied === `${wed_clients?.bacc_2}` ? <FiCheck size={20} /> : <FiCopy size={20} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeddingGift;
