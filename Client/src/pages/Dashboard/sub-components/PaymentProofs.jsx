import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto px-6 py-4 bg-[#0a1a2e] text-white">
        <h1 className="text-2xl font-semibold text-[#87cefa] mb-4">
          Payment Proofs
        </h1>
        <table className="min-w-full border-collapse bg-[#12294a] shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#0e3a66] text-white">
            <tr>
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element, index) => (
                <tr
                  key={index}
                  className="border-b transition-colors hover:bg-[#1e3a5c]"
                >
                  <td className="py-3 px-6">{element.userId}</td>
                  <td className="py-3 px-6">{element.status}</td>
                  <td className="py-3 px-6 text-center flex items-center justify-center gap-2">
                    <button
                      className="bg-[#1e90ff] text-white py-1 px-4 rounded-md hover:bg-[#1565c0] transition-all"
                      onClick={() => handleFetchPaymentDetail(element._id)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-[#ff4d4d] text-white py-1 px-4 rounded-md hover:bg-[#d32f2f] transition-all"
                      onClick={() => handlePaymentProofDelete(element._id)}
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
                  className="py-5 px-6 text-center text-lg text-[#87cefa]"
                >
                  No payment proofs are found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProofs;

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();
  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end ${
        openDrawer && singlePaymentProof.userId ? "visible" : "invisible"
      } transition-opacity duration-300`}
    >
      <div className="w-full sm:max-w-lg bg-[#12294a] text-white rounded-t-md p-4">
        <h3 className="text-2xl font-bold text-[#87cefa] text-center mb-2">
          Update Payment Proof
        </h3>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-[#87cefa]">User ID</label>
            <input
              type="text"
              value={singlePaymentProof.userId || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-[#1e3a5c] text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-[#87cefa]">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-[#1e3a5c] text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-[#87cefa]">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-[#1e3a5c] text-white"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Settled">Settled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-[#87cefa]">Comment</label>
            <textarea
              rows={4}
              value={singlePaymentProof.comment || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-[#1e3a5c] text-white"
            />
          </div>
          <div className="flex p-2 gap-2">
            <Link
              to={singlePaymentProof.proof?.url || ""}
              className="block w-full text-center bg-[#ff4d4d] text-white py-2 rounded-md font-semibold hover:bg-[#d32f2f]"
              target="_blank"
            >
              View Payment Proof
            </Link>
            <button
              type="button"
              onClick={handlePaymentProofUpdate}
              className="w-full bg-[#1e90ff] text-white py-2 rounded-md font-semibold hover:bg-[#1565c0]"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={() => setOpenDrawer(false)}
              className="w-full bg-gray-300 text-gray-700 py-2 rounded-md font-semibold hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
