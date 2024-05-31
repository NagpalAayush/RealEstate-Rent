import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
        state.error = null;
        state.loading = false;
        state.currentUser = action.payload;
    },
    signinFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});


export const {signinFailure , signinSuccess ,  signinStart} = userSlice.actions;
export default userSlice.reducer; 