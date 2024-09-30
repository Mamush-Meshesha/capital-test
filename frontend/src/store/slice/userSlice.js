import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isUserLogin: false,
  registeredUser: [],
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isUserLogin = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUserLogin = false;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isUserLogin = false;
    },

    // register slice
    registerStart: (state) => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      (state.loading = false), (state.registeredUser = action.payload);
    },
    registerFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} = userSlice.actions;

export default userSlice.reducer
