import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleOnClick = () => {
    navigate("/login");
  };
  return (
    <div className="bg-green-100 px-12 h-screen lg:h-[89vh] flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <div className="w-full lg:w-5/6 ">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold sm:text-center  md:text-center lg:text-left">
            create & listen the <br />
            <h1 className="flex items-end justify-center lg:justify-start">
              p
              <span>
                <img
                  src="/src/assets/headphones.png"
                  alt="headphone"
                  className="h-10 md:h-12 lg:h-16"
                />
              </span>
              dcast
            </h1>
          </h1>
        </div>

        <div className="hidden lg:block w-1/6">
          <div className="py-4 border border-black rounded-full text-center font-semibold -rotate-90 bg-white">
            Scroll Down
          </div>
        </div>
      </div>
      <div className="mt-12 w-full flex items-end justify-between">
        <div className="flex flex-col items-center lg:items-start justify-center">
          <p className="text-xl font-semibold text-center lg:text-start">
            Listen to the most popular podcasts on just one platform -{" "}
            <b>PODCASTER</b>
          </p>
          {isLoggedIn ? (
            <></>
          ) : (
            <button
              onClick={handleOnClick}
              className="bg-green-900 text-white px-4 py-4 font-semibold border rounded-full mt-4"
            >
              Log In to listen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
