import Spinner from "@/custom-components/Spinner";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// Helper component for each row in the leaderboard for better organization
const LeaderboardRow = ({ user, rank }) => {
  // Function to determine styling based on rank
  const getRankStyling = (rank) => {
    if (rank === 1) {
      return {
        container: "bg-gradient-to-r from-yellow-400/20 to-yellow-500/10 shadow-yellow-500/20 scale-[1.03]",
        border: "border-yellow-400",
        badge: "👑 Top Bidder",
      };
    }
    if (rank === 2) {
      return {
        container: "bg-slate-400/10",
        border: "border-slate-400",
        badge: null,
      };
    }
    if (rank === 3) {
      return {
        container: "bg-orange-500/10",
        border: "border-orange-500",
        badge: null,
      };
    }
    return { container: "", border: "border-gray-600", badge: null };
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const { container, border, badge } = getRankStyling(rank);

  return (
    <motion.div
      className={`grid grid-cols-12 items-center gap-4 p-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-gray-700/50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${container}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Rank */}
      <div className="col-span-2 md:col-span-1 text-center">
        <p className="text-2xl font-black text-white">{getRankIcon(rank)}</p>
      </div>

      {/* Profile */}
      <div className="col-span-5 md:col-span-5 flex items-center gap-4">
        <img
          src={user.profileImage?.url || 'https://via.placeholder.com/150'} // Fallback image
          alt={user.userName}
          className={`h-14 w-14 object-cover rounded-full border-2 ${border}`}
        />
        <div>
          <p className="font-bold text-lg text-white">{user.userName}</p>
          {badge && (
            <span className="text-xs font-bold text-yellow-400 bg-yellow-900/50 px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Stats - Bid Expenditure */}
      <div className="hidden md:block col-span-3 text-right">
        <p className="text-lg font-semibold text-cyan-300">Rs. {user.moneySpent.toLocaleString()}</p>
        <p className="text-xs text-gray-400 uppercase">Expenditure</p>
      </div>
      
      {/* Stats - Auctions Won */}
      <div className="col-span-5 md:col-span-3 text-right">
        <p className="text-lg font-semibold text-fuchsia-400">{user.auctionsWon}</p>
        <p className="text-xs text-gray-400 uppercase">Auctions Won</p>
      </div>
    </motion.div>
  );
};


const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);
  
  // Animation variants for the list container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section className="w-full ml-0 px-4 sm:px-6 pt-20 lg:pl-[320px] flex flex-col min-h-screen from-white via-[#f0f0ff] to-[#e9f6ff] text-white">
      {loading ? (
        <div className="flex items-center justify-center flex-grow">
            <Spinner />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC]">
              🏆 Bidders Leaderboard
            </h1>
            <p className="text-gray-400 mt-3 text-lg">
              Top 100 most active and competitive bidders
            </p>
          </div>

          {/* Leaderboard List */}
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {leaderboard.slice(0, 100).map((user, index) => (
              <LeaderboardRow key={user._id} user={user} rank={index + 1} />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Leaderboard;