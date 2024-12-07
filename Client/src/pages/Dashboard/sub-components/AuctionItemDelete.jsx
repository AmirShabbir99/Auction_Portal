import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <>
      <div className="overflow-x-auto mb-10 bg-[#0a1a2e] text-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-[#87cefa] mb-4">
          Auction Items
        </h2>
        <table className="min-w-full bg-[#12294a] border-gray-300 rounded-md">
          <thead className="bg-[#0e3a66] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-200">
            {allAuctions.length > 0 ? (
              allAuctions.map((element) => (
                <tr
                  key={element._id}
                  className="border-b transition-colors hover:bg-[#1e3a5c]"
                >
                  <td className="py-3 px-6">
                    <img
                      src={element.image?.url}
                      alt={element.title}
                      className="h-12 w-12 object-cover rounded border border-gray-500"
                    />
                  </td>
                  <td className="py-3 px-6">{element.title}</td>
                  <td className="py-3 px-6 flex space-x-2">
                    <Link
                      to={`/auction/details/${element._id}`}
                      className="bg-[#1e90ff] text-white py-1 px-3 rounded-md hover:bg-[#1565c0] transition-all duration-300"
                    >
                      View
                    </Link>
                    <button
                      className="bg-[#ff4d4d] text-white py-1 px-3 rounded-md hover:bg-[#d32f2f] transition-all duration-300"
                      onClick={() => handleAuctionDelete(element._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-5 px-6 text-center text-xl text-[#87cefa]"
                >
                  No Auctions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AuctionItemDelete;
