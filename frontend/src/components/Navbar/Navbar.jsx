import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  const [MobileNav, setMobileNav] = useState(false);
  const navLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Categories",
      path: "/categories",
    },
    {
      name: "All Podcasts",
      path: "/all-podcasts",
    },
  ];
  return (
    <nav className="px-4 md:px-8 lg:px-12 py-2 relative">
      <div className="flex items-center justify-between">
        <div className="logo brand-name w-2/6 flex items-center  gap-4">
          <img
            className="w-16 h-16"
            src="/src/assets/microphone.png"
            alt="podcaster"
          />
          <Link className="text-2xl font-bold" to={"/"}>
            PODCASTER
          </Link>
        </div>
        <div className="hidden w-2/6 lg:flex items-center justify-center">
          {navLinks.map((item, i) => (
            <Link
              className="ms-4 hover:font-semibold transition-all duration-300"
              to={item.path}
              key={i}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden w-2/6 lg:flex items-center justify-end">
          {isLoggedIn ? (
            <Link
              to={"/profile"}
              className="px-6 py-3 border border-black rounded-full transform hover:scale-105 transition-transform duration-200"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                to={"/login"}
                className="px-6 py-3 border border-black rounded-full transform hover:scale-105 transition-transform duration-200"
              >
                LogIn
              </Link>
              <Link
                to={"/signup"}
                className="ms-2 px-6 py-3 border bg-black rounded-full text-white transform hover:scale-105 transition-transform duration-200"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
        <div
          className={`w-4/6 flex items-center justify-end lg:hidden z-[1000] ${
            MobileNav ? "hidden" : ""
          }`}
        >
          <button className="text-4xl" onClick={() => setMobileNav(!MobileNav)}>
            <IoReorderThreeOutline />
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-blue-100 ${
          MobileNav ? "translate-y-[0%]" : "translate-y-[-200%]"
        } transition-transform duration-500 ease-in-out z-[2000] overflow-scroll`}
      >
        <div className="text-4xl flex items-center justify-end p-8 ">
          <button onClick={() => setMobileNav(!MobileNav)}>
            <RxCross1 />
          </button>
        </div>
        <div className="h-full flex flex-col items-center justify-center ">
          {navLinks.map((item, i) => (
            <Link
              className="mb-8 hover:font-semibold transition-all duration-300 text-4xl"
              to={item.path}
              key={i}
            >
              {item.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <Link
              to={"/profile"}
              className="mb-8 hover:font-semibold transition-all duration-300 text-4xl"
            >
              Profile
            </Link>
          ) : (
            <>
              <Link
                className="mb-8 hover:font-semibold transition-all duration-300 text-4xl"
                to={"/login"}
              >
                LogIn
              </Link>
              <Link
                className="mb-8 hover:font-semibold transition-all duration-300 text-4xl"
                to={"/signup"}
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
