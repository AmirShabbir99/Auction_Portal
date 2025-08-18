import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAuction, republishAuction } from "@/store/slices/auctionSlice";

// Auction Status Badge (reused style)
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

// Countdown Display (reused style)
const CountdownDisplay = ({ timeLeft }) => {
  const formatTimeUnit = (value, unit) => (
    <div className="text-center">
      <span className="text-2xl font-bold text-slate-700">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs text-slate-500 block">{unit}</span>
    </div>
  );

  return (
    <div className="flex items-center justify-around bg-slate-100 p-2 rounded-lg">
      {formatTimeUnit(timeLeft.days, "Days")}
      {formatTimeUnit(timeLeft.hours, "Hours")}
      {formatTimeUnit(timeLeft.minutes, "Mins")}
      {formatTimeUnit(timeLeft.seconds, "Secs")}
    </div>
  );
};

const CardTwo = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      return {
        status: "UPCOMING",
        type: "Starts In",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      return {
        status: "LIVE",
        type: "Ends In",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return { status: "ENDED" };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const dispatch = useDispatch();
  const handleDeleteAuction = () => {
    dispatch(deleteAuction(id));
  };

  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="group relative flex flex-col max-w-2xl w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:border-blue-300">
        {/* Image */}
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={
              imgSrc ||
              "https://via.placeholder.com/400x225/e0f2fe/0c4a6e?text=No+Image"
            }
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <AuctionStatusBadge status={timeLeft.status} />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3
            className="text-2xl font-bold text-gray-800 mb-3 truncate"
            title={title}
          >
            {title}
          </h3>

          {startingBid && (
            <p className="text-sm text-gray-500 mb-4">
              Starting Bid:{" "}
              <span className="text-blue-600 font-semibold text-base">
                Rs. {Number(startingBid).toLocaleString()}
              </span>
            </p>
          )}

          {/* Timer Section */}
          {timeLeft.status !== "ENDED" && (
            <div className="mt-auto space-y-2">
              <p className="text-sm font-medium text-gray-600">
                {timeLeft.type}
              </p>
              <CountdownDisplay timeLeft={timeLeft} />
            </div>
          )}

          {timeLeft.status === "ENDED" && (
            <div className="mt-auto flex items-center justify-center h-24 bg-gray-100 rounded-lg">
              <p className="text-lg font-bold text-gray-500">Auction Ended</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 mt-6">
            <Link
              className="bg-stone-700 text-center text-white text-lg px-4 py-2 rounded-md transition-all duration-300 hover:bg-black"
              to={`/auction/details/${id}`}
            >
              View Auction
            </Link>
            <button
              className="bg-red-500 text-center text-white text-lg px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-600"
              onClick={handleDeleteAuction}
            >
              Delete Auction
            </button>
            <button
              disabled={new Date(endTime) > Date.now()}
              onClick={() => setOpenDrawer(true)}
              className="bg-blue-500 disabled:bg-gray-400 text-center text-white text-lg px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-700 disabled:cursor-not-allowed"
            >
              Republish Auction
            </button>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <Drawer id={id} openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </div>
  );
};

// Drawer for republishing auction
const Drawer = ({ setOpenDrawer, openDrawer, id }) => {
  const dispatch = useDispatch();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { loading } = useSelector((state) => state.auction);

  const handleRepbulishAuction = () => {
    const formData = new FormData();
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(republishAuction(id, formData));
  };

  return (
    <section
      className={`fixed ${
        openDrawer && id ? "bottom-0" : "-bottom-full"
      } left-0 w-full transition-all duration-300 h-full bg-[#00000087] flex items-end`}
    >
      <div className="bg-white h-fit transition-all duration-300 w-full">
        <div className="w-full px-5 py-8 sm:max-w-[640px] sm:m-auto">
          <h3 className="text-blue-500 text-3xl font-semibold text-center mb-2">
            Republish Auction
          </h3>
          <p className="text-stone-600 text-center">
            Republish this auction with the same details but new starting and
            ending time.
          </p>
          <form className="flex flex-col gap-5 my-5">
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-stone-600">
                Republish Auction Start Time
              </label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h:mm aa"}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[16px] text-stone-600">
                Republish Auction End Time
              </label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={"MMMM d, yyyy h:mm aa"}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
              />
            </div>
            <button
              type="button"
              className="bg-blue-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-blue-700"
              onClick={handleRepbulishAuction}
            >
              {loading ? "Republishing..." : "Republish"}
            </button>
            <button
              type="button"
              className="bg-yellow-500 flex justify-center w-full py-2 rounded-md text-white font-semibold text-xl transition-all duration-300 hover:bg-yellow-600"
              onClick={() => setOpenDrawer(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CardTwo;
