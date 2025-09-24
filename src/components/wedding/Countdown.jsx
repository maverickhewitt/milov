import { useEffect, useState } from "react";

function Countdown({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft()); // in case targetDate changed
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);
      if (!updatedTime) clearInterval(timer);
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const renderGrid = (vals) => (
    <div className="w-full max-w-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 place-items-center">
      <TimeBlock label="Days" value={vals.days} />
      <TimeBlock label="Hours" value={vals.hours} />
      <TimeBlock label="Minutes" value={vals.minutes} />
      <TimeBlock label="Seconds" value={vals.seconds} />
    </div>
  );

  if (!timeLeft) {
    return (
      <>
        <div className="bg-white/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-md w-full max-w-xl mx-auto text-gray-800">
          {renderGrid({ days: 0, hours: 0, minutes: 0, seconds: 0 })}
        </div>
        <p className="text-center text-xl text-gray-700 font-semibold mt-3">
          The wedding day has arrived!
        </p>
      </>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-md w-full max-w-xl mx-auto text-gray-800">
      {renderGrid(timeLeft)}
    </div>
  );
}

function TimeBlock({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center px-2 py-1 min-w-[68px]">
      {/* tabular-nums keeps digits stable if available in your Tailwind config */}
      <div className="text-2xl sm:text-3xl font-bold text-gray-600 tabular-nums">{String(value).padStart(2, "0")}</div>
      <div className="text-xs sm:text-sm text-gray-500 uppercase">{label}</div>
    </div>
  );
}

export default Countdown;
