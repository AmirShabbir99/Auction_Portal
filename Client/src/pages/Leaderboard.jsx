import Spinner from "@/custom-components/Spinner";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const { loading, leaderboard } = useSelector((state) => state.user);

  const getRankIcon = (index) => {
    const rank = index + 1;
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <section className="w-full ml-0 px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC]">
              🏆 Bidders Leaderboard
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Top 100 most active and competitive bidders
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-[#F8FAFC] to-[#EEF2FF] text-gray-600 text-sm uppercase tracking-wider">
                  <th className="py-3 px-6 text-left rounded-tl-lg">Rank</th>
                  <th className="py-3 px-6 text-left">Profile</th>
                  <th className="py-3 px-6 text-left">Username</th>
                  <th className="py-3 px-6 text-left">Bid Expenditure</th>
                  <th className="py-3 px-6 text-left rounded-tr-lg">Auctions Won</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 100).map((user, index) => {
                  return (
                    <tr
                      key={user._id}
                      className="bg-white shadow-md hover:shadow-xl transition duration-300 transform hover:scale-[1.01] border-b border-gray-200 rounded-lg"
                    >
                      <td className="py-4 px-6 font-bold text-[#8EC5FC] text-lg">
                        {getRankIcon(index)}
                      </td>
                      <td className="py-4 px-6">
                        <img
                          src={user.profileImage?.url}
                          alt={user.userName}
                          className={`h-12 w-12 object-cover rounded-full border-2 ${
                            index === 0
                              ? "border-yellow-400"
                              : "border-gray-300"
                          }`}
                        />
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700">
                        {user.userName}
                      </td>
                      <td className="py-4 px-6 text-gray-600">Rs. {user.moneySpent}</td>
                      <td className="py-4 px-6 text-gray-600">{user.auctionsWon}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
};

export default Leaderboard;
