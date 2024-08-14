import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PodcastCard from "../components/PodcastCard/PodcastCard";
const CategoryPage = () => {
  const [podcasts, setPodcasts] = useState();
  const { cat } = useParams();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios(`http://localhost:7000/api/v1/category/${cat}`, {
        withCredentials: true,
      });
      // console.log(res);
      // console.log(res.data.data);
      setPodcasts(res.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="px-4 py-4 lg:px-12 pb-20">
      <h1 className="text-2xl font-semibold ">{cat}</h1>

      <div className="w-full py-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {podcasts &&
          podcasts.map((items, i) => (
            <div key={i}>
              <PodcastCard items={items} />
            </div>
          ))}
      </div>

      {podcasts && podcasts.length === 0 && (
        <div className="text-4xl font-semibold flex justify-center items-center py-20">
          No Podcasts Right Now
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
