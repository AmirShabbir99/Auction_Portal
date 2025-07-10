import Spinner from "@/custom-components/Spinner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full ml-0 px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white shadow-md mx-auto w-full max-w-4xl px-4 py-8 rounded-xl flex flex-col gap-8 items-center">
          <img
            src={user.profileImage?.url}
            alt="User Profile"
            className="w-32 h-32 rounded-full border-4 border-[#8EC5FC] object-cover"
          />

          {/* Personal Details */}
          <div className="w-full transition-transform duration-300 hover:scale-[1.02] bg-[#FAFAFA] p-5 rounded-lg shadow-sm border">
            <h3 className="text-2xl font-semibold text-[#8EC5FC] mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="Username" value={user.userName} />
              <InputField label="Email" value={user.email} />
              <InputField label="Role" value={user.role} />
              <InputField label="Joined On" value={user.createdAt?.substring(0, 10)} />
            </div>
          </div>

          {/* Payment Details */}
          {user.role === "Auctioneer" && (
            <div className="w-full transition-transform duration-300 hover:scale-[1.02] bg-[#FAFAFA] p-5 rounded-lg shadow-sm border">
              <h3 className="text-2xl font-semibold text-[#8EC5FC] mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Bank Name" value={user.paymentMethods.bankTransfer.bankName} />
                <InputField label="Bank Account (IBAN)" value={user.paymentMethods.bankTransfer.bankAccountNumber} />
                <InputField label="User Name On Bank Account" value={user.paymentMethods.bankTransfer.bankAccountName} />
                <InputField label="Easypaisa Account Number" value={user.paymentMethods.easypaisa.easypaisaAccountNumber} />
                <InputField label="Paypal Email" value={user.paymentMethods.paypal.paypalEmail} />
              </div>
            </div>
          )}

          {/* Other User Details */}
          <div className="w-full transition-transform duration-300 hover:scale-[1.02] bg-[#FAFAFA] p-5 rounded-lg shadow-sm border">
            <h3 className="text-2xl font-semibold text-[#8EC5FC] mb-4">Other User Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.role === "Auctioneer" && (
                <InputField label="Unpaid Commissions" value={user.unpaidCommission} />
              )}
              {user.role === "Bidder" && (
                <>
                  <InputField label="Auctions Won" value={user.auctionsWon} />
                  <InputField label="Money Spent" value={user.moneySpent} />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Reusable input field component
const InputField = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      disabled
      className="bg-white text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none"
    />
  </div>
);

export default UserProfile;
