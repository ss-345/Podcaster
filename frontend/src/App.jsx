import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./Pages/HomePage";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import Categories from "./Pages/Categories";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Profile";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "./store/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPodcast from "./Pages/AddPodcast";
import AllPodcasts from "./Pages/AllPodcasts";
import CategoryPage from "./Pages/CategoryPage";
import DescriptionPage from "./Pages/DescriptionPage";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:7000/api/v1/check-cookie",
          {
            withCredentials: true,
          }
        );
        // console.log(res.data.message); // Check what this returns
        if (res.data.message === "true") {
          dispatch(authAction.login());
        } else {
          dispatch(authAction.logout());
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetch();
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:cat" element={<CategoryPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-podcast" element={<AddPodcast />} />
            <Route path="/all-podcasts" element={<AllPodcasts />} />
            <Route path="/description/:id" element={<DescriptionPage />} />
            
          </Route>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
