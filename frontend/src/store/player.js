import { createSlice } from "@reduxjs/toolkit";
const playerSlice = createSlice({
  name: "player",
  initialState: {
    isplayerDiv: false,
    songPath: "",
    img: "",
  },
  reducers: {
    setDiv(state) {
      state.isplayerDiv = true;
    },
    closeDiv(state) {
      state.isplayerDiv = false;
    },
    changeSong(state, action) {
      const pathofSong = action.payload;
      state.songPath = pathofSong;
    },
    changeImage(state, action) {
      const imgofSong = action.payload;
      state.img = imgofSong;
    },
  },
});


export const playerActions = playerSlice.actions;
export default playerSlice.reducer;
