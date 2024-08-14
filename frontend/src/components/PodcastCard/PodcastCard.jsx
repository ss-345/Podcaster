import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/player";

const PodcastCard = ({ items }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const handleOnPlay = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      dispatch(playerActions.setDiv());
      dispatch(
        playerActions.changeImage(`http://localhost:7000/${items.frontImage}`)
      );

      dispatch(
        playerActions.changeSong(`http://localhost:7000/${items.audioFile}`)
      );
    }
  };
  return (
    <div className="p-4 max-w-sm mx-auto">
      <Link to={`/description/${items._id}`}>
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <div className="relative pb-56">
            <img
              src={`http://localhost:7000/${items.frontImage}`}
              className="absolute inset-0 h-full w-full object-cover"
              alt={items.title}
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {items.title.slice(0, 20)}
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              {items.description.slice(0, 40)}...
            </p>
            <div className="mt-4 bg-blue-100 text-blue-800 border border-blue-800 rounded px-4 py-2  text-center">
              {items.category.categoryName}
            </div>
            <Link
              to={isLoggedIn ? "#" : "/signUp"}
              className="mt-2 block bg-green-600 text-white text-center font-medium py-2 rounded hover:bg-green-700"
              onClick={handleOnPlay}
            >
              Play Now
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PodcastCard;
