import React, { useEffect, useRef, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/player";
import { TbPlayerPauseFilled } from "react-icons/tb";

const AudioPlayer = () => {
  const playerDivState = useSelector((state) => state.player.isplayerDiv);
  const playerImage = useSelector((state) => state.player.img);
  const playerAudio = useSelector((state) => state.player.songPath);
  const audioRef = useRef();
  const [isPlay, setIsPlay] = useState(false);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const audioPlayerDiv = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
  };

  const handleOnClickPlayPause = () => {
    setIsPlay(!isPlay);
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const handleLoadedMetaData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };
  const handleBackward = () => {
    if (audioRef.current) {
      let newTime = Math.max(currentTime - 10, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const handleForward = () => {
    if (audioRef.current) {
      let newTime = Math.min(currentTime + 10, duration);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  const handleSeekBar = (e) => {
    e.preventDefault();
    if (audioRef.current) {
      let newTime = (e.target.value / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };
  useEffect(() => {
    handleOnClickPlayPause();
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.addEventListener("timeupdate", handleTimeUpdate);
      currentAudio.addEventListener("loadedmetadata", handleLoadedMetaData);
    }
  }, [playerAudio]);
  
  return (
    <div
      className={`${
        playerDivState ? "fixed" : "hidden"
      } bottom-0 left-0 w-full bg-zinc-800 text-white p-4 rounded flex items-center gap-4 `}
    >
      <div className="hidden md:block w-1/3">
        <img src={playerImage} className="size-16 rounded-full object-cover" />
      </div>
      <div className="w-full md:1/3 flex flex-col items-center justify-center">
        <div className="w-full flex justify-center gap-4 items-center text-xl ">
          <button onClick={handleBackward}>
            <IoPlaySkipBack />
          </button>
          <button onClick={handleOnClickPlayPause}>
            {isPlay ? <TbPlayerPauseFilled /> : <IoPlay />}
          </button>
          <button onClick={handleForward}>
            <IoPlaySkipForward />
          </button>
        </div>
        <div className="w-full flex items-center justify-center mt-2">
          <input
            type="range"
            min={"0"}
            max={"100"}
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeekBar}
            className="w-full  hover:curson-pointer"
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-end absolute top-4 right-4">
        <button onClick={audioPlayerDiv}>
          <ImCross />
        </button>
      </div>
      <audio ref={audioRef} src={playerAudio} />
    </div>
  );
};

export default AudioPlayer;
