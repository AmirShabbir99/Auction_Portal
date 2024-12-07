import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    });
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <>
      <Link
        to={`/auction/item/${id}`}
        className="ring-1 flex flex-col m-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 "
      >
        <img src={imgSrc} alt={title} className="h-48 w-80 " />
        <div className="p-4">
          <h5 className="text-lg font-semibold text-gray-800 group-hover:text-[#8EC5FC] transition-colors mb-2">
            {title}
          </h5>
          {startingBid && (
            <p className="text-sm text-gray-600 font-light mb-2">
              Starting Bid:{" "}
              <span className="text-[#8EC5FC] font-bold">{startingBid}</span>
            </p>
          )}
          <p className="text-sm text-gray-600 font-light">
            {timeLeft.type}{" "}
            {Object.keys(timeLeft).length > 1 ? (
              <span className="text-[#8EC5FC] font-bold">
                {formatTimeLeft(timeLeft)}
              </span>
            ) : (
              <span className="text-[#4da2f6] font-bold">Time is up!</span>
            )}
          </p>
        </div>
      </Link>
    </>
  );
};

export default Card;
