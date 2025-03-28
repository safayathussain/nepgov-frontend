import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
