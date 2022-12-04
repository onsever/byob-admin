import { createSlice } from "@reduxjs/toolkit";
import { deleteData, storeData } from "../../utils/asyncStorage";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      storeData("user", action.payload);
    },
    logout: (state, action) => {
      state.user = null;
      deleteData("user");
    },
  },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
