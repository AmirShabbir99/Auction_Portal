import Card from "@/custom-components/Card"; // Assuming your Card component is in this path
import Spinner from "@/custom-components/Spinner";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// You can customize this list to match the categories in your data
const CATEGORIES = ["All", "Art", "Vehicles", "Collectibles", "Electronics", "Real Estate"];

const Auctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // This hook now returns a SINGLE, filtered list of auctions.
  const filteredAuctions = useMemo(() => {
    // Start with all auctions and apply filters step-by-step.
    return allAuctions.filter(auction => {
      // 1. Category Filter
      // IMPORTANT: This requires your auction objects from Redux to have a 'category' property.
      // e.g., { title: "...", category: "Art", ... }
      const matchesCategory = selectedCategory === 'All' || auction.category === selectedCategory;

      // 2. Search Filter
      // The `?.` prevents errors if an auction title is missing.
      const matchesSearch = auction.title?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allAuctions, searchTerm, selectedCategory]); // This logic re-runs only when these values change

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 py-10 pt-20 lg:pl-[320px] flex flex-col bg-gradient-to-br from-white via-[#f5f9ff] to-[#eaf6ff]">
      {loading ? (
        <div className="flex items-center justify-center flex-grow">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Page Heading */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              🎯 Explore Auctions
            </h1>
            <p className="text-gray-500 mt-2 text-lg max-w-xl">
              Browse through our live and upcoming auctions. Place your bids and win the item!
            </p>
          </div>

          {/* NEW: Search & Category Filters */}
          <div className="sticky top-[70px] z-20 mb-12 p-4 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-1/3 p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
              />
              <div className="flex-grow flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 text-sm font-semibold rounded-lg shrink-0 transition-all duration-200 transform hover:scale-105 ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Auction Cards - This section now uses the filtered list */}
          <AnimatePresence>
            {filteredAuctions.length > 0 ? (
              <motion.div
                layout // The `layout` prop animates the grid when items are added/removed
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10"
              >
                {filteredAuctions.map((element) => (
                  <motion.div
                    layout
                    key={element._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      title={element.title}
                      startTime={element.startTime}
                      endTime={element.endTime}
                      imgSrc={element.image?.url}
                      startingBid={element.startingBid}
                      id={element._id}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Display this message if no auctions match the filters
              <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 mt-4">
                <p className="text-gray-600 text-lg font-medium">No auctions match your criteria.</p>
                <p className="text-gray-400 mt-1">Try a different search or category.</p>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </section>
  );
};

export default Auctions;