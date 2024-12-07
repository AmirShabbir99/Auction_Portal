import { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation(); // Get the current route
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) =>
    pathname === path ? "text-[#3997f5] font-bold" : "text-gray-700";

  return (
    <>
      {/* Hamburger Menu */}
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-[#8EC5FC] text-white text-3xl p-2 rounded-full shadow-md hover:bg-[#3997f5] transition-all lg:hidden z-50"
      >
        <GiHamburgerMenu />
      </div>

      {/* Side Drawer */}
      <div
        className={`w-[100%] sm:w-[250px] bg-white shadow-lg h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-all duration-300 p-4 flex flex-col justify-between lg:left-0 z-40`}
      >
        <div className="relative ml-5">
          {/* Logo */}
          <Link to={"/"}>
            <h4 className="text-3xl font-bold text-black mb-6">
              Prime<span className="text-[#3997f5]">Bid</span>
            </h4>
          </Link>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-4 text-lg">
            <li>
              <Link
                to={"/auctions"}
                className={`flex items-center gap-2 font-medium hover:text-[#8EC5FC] transition-all ${isActive(
                  "/auctions"
                )}`}
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>
            <li>
              <Link
                to={"/leaderboard"}
                className={`flex items-center gap-2 font-medium hover:text-[#8EC5FC] transition-all ${isActive(
                  "/leaderboard"
                )}`}
              >
                <MdLeaderboard /> Leaderboard
              </Link>
            </li>
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to={"/submit-commission"}
                    className={`flex items-center gap-2 font-medium hover:text-[#8EC5FC] transition-all ${isActive(
                      "/submit-commission"
                    )}`}
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/create-auction"}
                    className={`flex items-center gap-2 font-medium hover:text-[#8EC5FC] transition-all ${isActive(
                      "/create-auction"
                    )}`}
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/view-my-auctions"}
                    className={`flex items-center gap-2 font-medium hover:text-[#8EC5FC] transition-all ${isActive(
                      "/view-my-auctions"
                    )}`}
                  >
                    <FaEye /> View My Auctions
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user && user.role === "Super Admin" && (
              <li>
                <Link
                  to={"/dashboard"}
                  className={`flex items-center gap-2 font-medium hover:text-[#8EC5FC] transition-all ${isActive(
                    "/dashboard"
                  )}`}
                >
                  <MdDashboard /> Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* Authentication Section */}
          <div className="my-6">
            {!isAuthenticated ? (
              <div className="flex gap-4 -mr-12">
                <Link
                  to={"/sign-up"}
                  className="bg-[#8EC5FC] text-white font-bold py-2 px-4 rounded-md hover:bg-[#3997f5] transition-all"
                >
                  Sign Up
                </Link>
                <Link
                  to={"/login"}
                  className="border-2  border-[#8EC5FC] text-[#8EC5FC] font-bold py-2 px-4 rounded-md hover:bg-[#8EC5FC] hover:text-white transition-all"
                >
                  Login
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-[#8EC5FC] text-white font-bold py-2 px-6 rounded-md hover:bg-[#3997f5] transition-all"
              >
                Logout
              </button>
            )}
          </div>

          <hr className="border-gray-300 my-6" />

          {/* Additional Links */}
          <ul className="flex flex-col gap-4 text-lg">
            {isAuthenticated && (
              <li>
                <Link
                  to={"/me"}
                  className={`flex items-center gap-2 font-medium hover:text-[#8EC5FC] transition-all ${isActive(
                    "/me"
                  )}`}
                >
                  <FaUserCircle /> Profile
                </Link>
              </li>
            )}
            <li>
              <Link
                to={"/how-it-works-info"}
                className={`flex items-center gap-2 font-medium hover:text-[#8EC5FC] transition-all ${isActive(
                  "/how-it-works-info"
                )}`}
              >
                <SiGooglesearchconsole /> How it works
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className={`flex items-center gap-2 font-medium hover:text-[#8EC5FC] transition-all ${isActive(
                  "/about"
                )}`}
              >
                <BsFillInfoSquareFill /> About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-gray-500 text-center mr-10 mt-8">
          <Link
            to={"/contact"}
            className="font-medium hover:text-[#8EC5FC] transition-all"
          >
            Contact Us
          </Link>
          <p>&copy; PrimeBid, LLC.</p>
          <p>
            Designed By{" "}
            <Link
              to={"/"}
              className="font-bold hover:text-[#8EC5FC] transition-all"
            >
              Amir Shabbir
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
