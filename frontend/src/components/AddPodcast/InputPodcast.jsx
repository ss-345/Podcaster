import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const InputPodcast = () => {
  const [frontImage, setFrontImage] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    category: "",
  });
  const handleChangeImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    // console.log(file);
    setFrontImage(file);
  };
  const handleOnDragging = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleOnDragLeaving = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };
  const handleOnDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setFrontImage(file);
  };
  const handleAudioFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    // console.log(file);
    setAudioFile(file);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const handleOnSubmit = async () => {
    const data = new FormData();
    data.append("title", inputs.title);
    data.append("description", inputs.description);
    data.append("category", inputs.category);
    data.append("frontImage", frontImage);
    data.append("audioFile", audioFile);
    try {
      const res = await axios.post(
        "http://localhost:7000/api/v1/add-podcast",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setInputs({
        title: "",
        description: "",
        category: "",
      });
      setFrontImage(null);
      setAudioFile(null);
    }
  };

  return (
    <div className="my-4 px-4 lg:px-12">
      <ToastContainer />
      <h1 className="text-2xl font-semibold">Create Your Podcast</h1>
      <div className="mt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="w-full lg:w-2/6 flex items-center justify-center lg:justify-start">
          <div
            className="size-[40vh] lg:size-[60vh] flex items-center justify-center hover:bg-slate-200 transition-all duration-500 border"
            onDragEnter={handleOnDragging}
            onDragLeave={handleOnDragLeaving}
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
          >
            <input
              type="file"
              accept="image/"
              id="file"
              name="frontImage"
              className="hidden"
              onChange={handleChangeImage}
            />
            {frontImage ? (
              <img
                src={URL.createObjectURL(frontImage)}
                alt="thumbnail"
                className="h-[100%] w-[100%] object-cover"
              />
            ) : (
              <label
                htmlFor="file"
                className={`text-xl h-[100%] w-[100%] p-4 flex items-center justify-center ${
                  dragging ? "bg-blue-200" : ""
                } `}
              >
                <div className="text-center">
                  Drag and drop the thumbnail or click to browse
                </div>
              </label>
            )}
          </div>
        </div>
        <div className="w-full lg:w-4/6">
          <div className="flex flex-col">
            <label htmlFor="title" className="font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter title"
              className="mt-2 px-4 py-2 outline-none border-zinc-800 rounded border"
              value={inputs.title}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="description" className="font-semibold">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Enter title"
              className="mt-2 px-4 py-2 outline-none border-zinc-800 rounded border"
              rows={4}
              value={inputs.description}
              onChange={handleOnChange}
            />
          </div>
          <div className="flex flex-row mt-4">
            <div className="flex flex-col w-2/6">
              <label htmlFor="audioFile" className="font-semibold">
                Select Audio
              </label>
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.ogg"
                id="audioFile"
                className="mt-2"
                onChange={handleAudioFile}
              />
            </div>
            <div className="flex flex-col w-4/6">
              <label htmlFor="category" className="font-semibold">
                Select Category
              </label>
              <select
                name="category"
                id="category"
                className="border border-zinc-900 rounded mt-4 outline-none px-4 py-2"
                onChange={handleOnChange}
                value={inputs.category}
              >
                <option value="">Select Category</option>
                <option value="Comedy">Comedy</option>
                <option value="Sports">Sports</option>
                <option value="Goverment">Goverment</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Hobbies">Hobbies</option>
              </select>
            </div>
          </div>
          <div className="mt-8 lg:mt-6 flex">
            <button
              className="px-4 w-full py-2 bg-zinc-800 text-white rounded"
              onClick={handleOnSubmit}
            >
              Create Podcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPodcast;
