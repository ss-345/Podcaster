import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PodcastCard from "../PodcastCard/PodcastCard";

const UserPodcast = () => {
  const [userPodcast, setUserPodcast] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios("http://localhost:7000/api/v1/get-user-podcasts", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      setUserPodcast(res.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="px-4 lg:px-12 my-4">
      <div className="flex justify-between items-center gap-4">
        <h1 className="font-semibold md:font-bold text-xl">Your Podcast</h1>
        <Link
          to={"/add-podcast"}
          className="px-4 py-2 bg-zinc-800 rounded text-white font-semibold"
        >
          Add Podcast
        </Link>

      </div>
      
      <div className="w-full px-4 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {userPodcast &&
          userPodcast.map((items, i) => (
            <div key={i}>
              <PodcastCard items={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserPodcast;
