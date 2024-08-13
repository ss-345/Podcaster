import React, { useEffect, useState } from "react";
import InputPodcast from "../components/AddPodcast/InputPodcast";
import ErrorPage from "./ErrorPage";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const AddPodcast = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading when checking login status
    setTimeout(() => {
      setLoading(false); // Set loading to false after checking login status
    }, 2000); // Example delay of 2 seconds
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }
  return <div>{isLoggedIn ? <InputPodcast /> : <ErrorPage />}</div>;
};

export default AddPodcast;
