import React from "react";

function LoveJourney({ wed_clients, getPublicUrl }) {
  return (
    <section className="bg-white py-16 px-4 font-serif">
      <div className="relative text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide relative inline-block">
          Love Journey
          <span className="relative block h-[4px] mt-2 overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent animate-underlineGlow" />
          </span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical timeline line with heart */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-full z-0 flex flex-col items-center">
          <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center shadow-md mb-2 animate-pulse">
            ❤︎
          </div>
          <div className="flex-1 w-1 bg-gray-300 border-dotted border-l-2 rounded-full opacity-70"></div>
        </div>

        {/* Timeline Items */}
        <div className="space-y-24 relative z-10">
          {/* First Met */}
          <TimelineItem
            title="First Met"
            text={`It all started with a smile in ${wed_clients.first_met}. Our hearts felt the first spark of destiny.`}
            image={getPublicUrl(wed_clients.img_1)}
            alt={`${wed_clients.names} First Met`}
            reverse={false}
          />

          {/* In Relationship */}
          <TimelineItem
            title="In Relationship"
            text={`In ${wed_clients.in_relationship}, With time, laughter, and love, we grew stronger and decided to walk this path together.`}
            image={getPublicUrl(wed_clients.img_2)}
            alt={`${wed_clients.names} In Relationship`}
            reverse={true}
          />

          {/* Engagement */}
          <TimelineItem
            title="Engagement"
            text={`In ${wed_clients.engagement}, we sealed our promise with a ring and hearts full of dreams.`}
            image={getPublicUrl(wed_clients.img_3)}
            alt={`${wed_clients.names} Engagement`}
            reverse={false}
          />

          {/* Getting Married */}
          <TimelineItem
            title="Getting Married"
            text={`This ${wed_clients.getting_married}, we’re writing the next chapter, ready to begin our forever story together.`}
            image={getPublicUrl(wed_clients.img_4)}
            alt={`${wed_clients.names} Getting Married`}
            reverse={true}
          />
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ title, text, image, alt, reverse }) {
  return (
    <div className={`flex flex-col md:flex-row${reverse ? "-reverse" : ""} items-center gap-10 md:gap-16`}>
      <div className={`md:w-1/2 ${reverse ? "text-left md:pl-12 text-center md:text-left" : "text-right md:pr-12 text-center md:text-right"}`}>
        <h3 className="text-2xl font-bold text-gray-600">{title}</h3>
        <p className="text-gray-600 mt-2">{text}</p>
      </div>
      <div className="w-64 max-w-[80vw] aspect-[4/5] rounded-3xl overflow-hidden black-border-glow border-[1.5px] border-white/40 shadow-lg backdrop-blur-md bg-white/10 ring-2 ring-white/20 hover:scale-[1.02] transition-all duration-300">
        <img src={image} alt={alt} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default LoveJourney;
