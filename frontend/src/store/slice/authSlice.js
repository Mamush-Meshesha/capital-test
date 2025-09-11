import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const getNormalizedUser = (payload) => {
  if (!payload) return null;
  // If backend returns { user: {...} }
  if (payload.user && typeof payload.user === "object") return payload.user;
  // If backend returns user flat: { id, email, role, name, ... }
  const possiblyUser = payload;
  if (
    possiblyUser.email ||
    possiblyUser.role ||
    possiblyUser.id ||
    possiblyUser.name
  ) {
    return possiblyUser;
  }
  return null;
};

const getNormalizedToken = (payload) => {
  if (!payload) return null;
  return payload.token || payload.accessToken || payload.jwt || null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      const normalizedUser = getNormalizedUser(action.payload);
      const normalizedToken = getNormalizedToken(action.payload);
      state.user = normalizedUser;
      state.token = normalizedToken;
      state.isAuthenticated =
        Boolean(normalizedUser) || Boolean(normalizedToken);
      if (normalizedToken) localStorage.setItem("token", normalizedToken);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Logout action
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },

    // Register actions
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      const normalizedUser = getNormalizedUser(action.payload);
      const normalizedToken = getNormalizedToken(action.payload);
      state.user = normalizedUser;
      state.token = normalizedToken;
      state.isAuthenticated =
        Boolean(normalizedUser) || Boolean(normalizedToken);
      if (normalizedToken) localStorage.setItem("token", normalizedToken);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Set authentication state
    setAuth: (state) => {
      state.isAuthenticated = true;
    },

    // Load user data
    loadUser: (state, action) => {
      const normalizedUser = getNormalizedUser(action.payload);
      state.user = normalizedUser;
      state.isAuthenticated = Boolean(normalizedUser) || state.isAuthenticated;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
  clearError,
  setAuth,
  loadUser,
} = authSlice.actions;

export default authSlice.reducer;
