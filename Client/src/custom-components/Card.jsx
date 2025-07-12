import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Helper Component 1: A visual badge for the auction status (Light Theme)
const AuctionStatusBadge = ({ status }) => {
  const styles = {
    LIVE: "bg-green-100 text-green-800 border-green-300",
    UPCOMING: "bg-blue-100 text-blue-800 border-blue-300",
    ENDED: "bg-gray-100 text-gray-800 border-gray-300",
  };

  return (
    <div
      className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full border ${styles[status] || styles.ENDED}`}
    >
      {status}
    </div>
  );
};

// Helper Component 2: A clear display for the countdown (Light Theme)
const CountdownDisplay = ({ timeLeft }) => {
  const formatTimeUnit = (value, unit) => (
    <div className="text-center">
      <span className="text-2xl font-bold text-slate-700">{String(value).padStart(2, '0')}</span>
      <span className="text-xs text-slate-500 block">{unit}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-around bg-slate-100 p-2 rounded-lg">
      {formatTimeUnit(timeLeft.days, 'Days')}
      {formatTimeUnit(timeLeft.hours, 'Hours')}
      {formatTimeUnit(timeLeft.minutes, 'Mins')}
      {formatTimeUnit(timeLeft.seconds, 'Secs')}
    </div>
  );
};


const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const [auctionState, setAuctionState] = useState({
    status: "LOADING",
    timeLeft: {},
  });

  // The timer logic is correct and does not need to change.
  useEffect(() => {
    const calculateStatus = () => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);
      let timer; // Declare timer here to be accessible in cleanup

      if (start > now) {
        const diff = start - now;
        setAuctionState({
          status: "UPCOMING",
          timeLeft: {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
          },
        });
      } else if (end > now) {
        const diff = end - now;
        setAuctionState({
          status: "LIVE",
          timeLeft: {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
          },
        });
      } else {
        setAuctionState({ status: "ENDED", timeLeft: {} });
        if (timer) clearInterval(timer); // Check if timer exists before clearing
      }
    };

    calculateStatus();
    const timer = setInterval(calculateStatus, 1000);
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const timerLabel = auctionState.status === "UPCOMING" ? "Starts In" : "Ends In";

  return (
    <Link
      to={`/auction/item/${id}`}
      className="group relative flex flex-col w-full h-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-300"
    >
      <div className="relative">
        {/*
          THIS IS THE FIX:
          The previous code used `aspect-w-16 aspect-h-9` which requires a plugin.
          We replaced it with a standard Tailwind class `h-48` (12rem) to give the image container a fixed height.
          This works without any extra installation.
        */}
        <div className="relative h-48 w-full overflow-hidden">
            <img 
                src={imgSrc || 'https://via.placeholder.com/400x225/e0f2fe/0c4a6e?text=No+Image'} // Light theme placeholder
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
        </div>
        <AuctionStatusBadge status={auctionState.status} />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={title}>
          {title}
        </h3>
        
        {startingBid && (
          <p className="text-sm text-gray-500 mb-4">
            Starting Bid: <span className="text-blue-600 font-semibold text-base">Rs. {Number(startingBid).toLocaleString()}</span>
          </p>
        )}

        {auctionState.status !== "ENDED" && (
            <div className="mt-auto space-y-2">
                <p className="text-sm font-medium text-gray-600">{timerLabel}</p>
                <CountdownDisplay timeLeft={auctionState.timeLeft} />
            </div>
        )}
        
        {auctionState.status === "ENDED" && (
            <div className="mt-auto flex items-center justify-center h-24 bg-gray-100 rounded-lg">
                <p className="text-lg font-bold text-gray-500">Auction Ended</p>
            </div>
        )}
      </div>
    </Link>
  );
};

export default Card;