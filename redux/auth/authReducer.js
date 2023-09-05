import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userId: null,
  login: "",
  email: "",
  password: "",
  stateChange: false,
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => ({
      ...state,
      userId: action.payload.userId,
      login: action.payload.login,
    }),
    authStateChange: (state, action) => ({
      ...state,
      stateChange: action.payload.stateChange,
    }),
    signOutUser: () => initialState,
  },
});
export const { updateUserProfile, authStateChange, signOutUser } =
  usersSlice.actions;
