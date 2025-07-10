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
    <section className="w-full px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-gradient-to-br from-white via-[#f0f0ff] to-[#e9f6ff]">
      {loading ? (
        <Spinner />
      ) : (
        <div className="backdrop-blur-lg bg-white/70 border border-gray-200 shadow-2xl mx-auto w-full max-w-4xl px-6 py-10 rounded-3xl flex flex-col gap-10 items-center transition-all duration-300 hover:shadow-[#8EC5FC]/30 hover:shadow-xl">
          
          {/* Profile Image & Name */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={user.profileImage?.url}
              alt="User"
              className="w-32 h-32 rounded-full border-4 object-cover border-[#8EC5FC] shadow-lg"
            />
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8EC5FC] to-[#E0C3FC]">
              {user.userName}
            </h1>
            <p className="text-gray-500 text-sm tracking-wide">
              Joined on {user.createdAt?.substring(0, 10)}
            </p>
          </div>

          {/* Sections */}
          <InfoCard title="👤 Personal Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField label="Username" value={user.userName} />
              <InputField label="Email" value={user.email} />
              <InputField label="Role" value={user.role} />
              <InputField label="Joined On" value={user.createdAt?.substring(0, 10)} />
            </div>
          </InfoCard>

          {user.role === "Auctioneer" && (
            <InfoCard title="💳 Payment Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Bank Name" value={user.paymentMethods.bankTransfer.bankName} />
                <InputField label="Bank Account (IBAN)" value={user.paymentMethods.bankTransfer.bankAccountNumber} />
                <InputField label="Name On Bank Account" value={user.paymentMethods.bankTransfer.bankAccountName} />
                <InputField label="Easypaisa Number" value={user.paymentMethods.easypaisa.easypaisaAccountNumber} />
                <InputField label="PayPal Email" value={user.paymentMethods.paypal.paypalEmail} />
              </div>
            </InfoCard>
          )}

          <InfoCard title="📊 Activity Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {user.role === "Auctioneer" && (
                <InputField label="Unpaid Commissions" value={user.unpaidCommission} />
              )}
              {user.role === "Bidder" && (
                <>
                  <InputField label="Auctions Won" value={user.auctionsWon} />
                  <InputField label="Money Spent" value={`Rs. ${user.moneySpent}`} />
                </>
              )}
            </div>
          </InfoCard>
        </div>
      )}
    </section>
  );
};

// 🔄 Modern card container
const InfoCard = ({ title, children }) => (
  <div className="w-full bg-white/80 border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.01] backdrop-blur">
    <h3 className="text-xl font-semibold text-[#8EC5FC] mb-4 tracking-wide">{title}</h3>
    {children}
  </div>
);

// 🧩 Reusable input field
const InputField = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-500 mb-1">{label}</label>
    <input
      type="text"
      value={value}
      disabled
      className="bg-white/90 text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
    />
  </div>
);

export default UserProfile;
