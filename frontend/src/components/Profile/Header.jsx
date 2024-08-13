import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { authAction } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [userData, setUserData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios("http://localhost:7000/api/v1/user-details", {
          withCredentials: true,
        });

        setUserData(res.data.user);
        // console.log(res.data.user);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDetails();
  }, []);
  const handleOnClickLogOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7000/api/v1/log-out",
        {},
        { withCredentials: true }
      );

      dispatch(authAction.logout());

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {userData && (
        <div className="bg-gradient-to-r from-green-700 to-green-900 p-4 md:p-6 lg:p-8 shadow-md">
          <ToastContainer />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-2xl text-white font-bold transition-transform transform hover:scale-105">
                Profile
              </p>
              <h1 className="text-2xl md:text-4xl lg:text-6xl text-white font-semibold transition-transform transform hover:scale-105">
                {userData.username}
              </h1>
              <p className="text-zinc-300 mt-1">{userData.email}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                className="bg-white text-zinc-800 px-4 py-2 rounded font-semibold transition duration-300 hover:bg-green-500 hover:shadow-lg transform hover:scale-105"
                onClick={handleOnClickLogOut}
              >
                LogOut
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
