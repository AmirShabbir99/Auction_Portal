import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);

  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
    setAmount(0);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full min-h-screen px-5 pt-20 lg:pl-[320px] bg-gradient-to-br from-stone-50 to-stone-100">
      {/* Breadcrumb */}
      <div className="text-sm flex flex-wrap gap-2 items-center mb-6 text-stone-600">
        <Link to="/" className="font-medium hover:text-[#8EC5FC] transition">
          Home
        </Link>
        <FaChevronRight className="text-stone-400 text-xs" />
        <Link
          to="/auctions"
          className="font-medium hover:text-[#8EC5FC] transition"
        >
          Auctions
        </Link>
        <FaChevronRight className="text-stone-400 text-xs" />
        <p className="font-semibold">{auctionDetail.title}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Auction Detail */}
          <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="bg-stone-100 rounded-xl flex justify-center items-center w-full sm:w-48 h-48 p-4">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="object-contain max-h-40"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-stone-800">
                  {auctionDetail.title}
                </h2>
                <p className="text-lg mt-2">
                  Condition:{" "}
                  <span className="font-semibold text-[#8EC5FC]">
                    {auctionDetail.condition}
                  </span>
                </p>
                <p className="text-lg">
                  Start Bid:{" "}
                  <span className="font-semibold text-[#8EC5FC]">
                    Rs.{auctionDetail.startingBid}
                  </span>
                </p>
                <p className="text-lg">
                  Current Bid:{" "}
                  <span className="font-semibold text-[#8EC5FC]">
                    Rs.{auctionDetail.currentBid}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">
                Auction Item Description
              </h3>
              <ul className="list-disc list-inside text-stone-700 space-y-2">
                {auctionDetail.description &&
                  auctionDetail.description.split(". ").map((element, index) => (
                    <li key={index}>{element}</li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Bids Section */}
          <div className="flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden">
            <header className="bg-gradient-to-r from-[#8EC5FC] to-[#3b82f6] text-white py-4 text-center text-xl font-semibold">
              Bids
            </header>

            <div className="flex-1 px-6 py-4 max-h-[600px] overflow-y-auto">
              {auctionBidders &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((element, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-stone-200 hover:bg-stone-50 rounded-lg px-2 transition"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={element.profileImage}
                          alt={element.userName}
                          className="w-12 h-12 rounded-full border border-stone-200"
                        />
                        <p className="font-medium text-stone-800">
                          {element.userName}
                        </p>
                      </div>
                      <span
                        className={`text-lg font-semibold ${
                          index === 0
                            ? "text-green-600"
                            : index === 1
                            ? "text-blue-600"
                            : index === 2
                            ? "text-yellow-600"
                            : "text-stone-500"
                        }`}
                      >
                        {index + 1} {index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No bids for this auction
                  </p>
                )
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <img
                  src="/notStarted.png"
                  alt="not-started"
                  className="w-full max-h-[500px] object-contain"
                />
              ) : (
                <img
                  src="/auctionEnded.png"
                  alt="ended"
                  className="w-full max-h-[500px] object-contain"
                />
              )}
            </div>

            {/* Place Bid */}
            <div className="bg-stone-100 px-6 py-4 flex items-center justify-between">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      className="w-32 rounded-md border border-stone-300 px-2 py-1 focus:ring-2 focus:ring-[#8EC5FC] outline-none"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <button
                    className="p-3 text-white bg-gradient-to-r from-[#8EC5FC] to-[#3b82f6] rounded-full shadow-md hover:scale-105 transition"
                    onClick={handleBid}
                  >
                    <RiAuctionFill size={22} />
                  </button>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="text-stone-700 font-semibold">
                  Auction has not started yet!
                </p>
              ) : (
                <p className="text-stone-700 font-semibold">
                  Auction has ended!
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
