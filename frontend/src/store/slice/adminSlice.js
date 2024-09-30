import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAdminLogin: false,
  isAdmin: null,
  error: null,
  registeredAdmin: [],
  customers: [],
  managers: [],
  restaurant: []
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLoginRequest: (state) => {
      state.loading = true;
      state.isAdminLogin = false;
    },
    adminLoginSuccess: (state, action) => {
      state.loading = false;
      state.isAdminLogin = true;
      state.isAdmin = action.payload;
    },
    adminLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminlogoutRequest: (state) => {
      state.loading = true;
    },
    adminLogoutSuccess: (state) => {
      state.loading = false;
      state.isAdminLogin = false;
      state.isAdmin = null;
    },
    adminLogoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminRegisterRequest: (state) => {
      state.loading = true;
    },
    adminRegisterSuccess: (state, action) => {
      state.loading = false;
      state.registeredAdmin = action.payload;
    },
    adminRegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRoleRequest: (state) => {
      state.loading = true;
    },
    fetchRoleSuccess: (state, action) => {
      (state.loading = false), (state.roles = action.payload);
    },
    fetchRoleFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },

    fetchCustomersRequest: (state) => {
      state.loading = true;
    },
    fetchCustomersSuccess: (state, action) => {
      state.loading = false;
      state.customers = action.payload;
    },
    fetchCustomersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchManagerRequest: (state) => {
      state.loading = true;
    },
    fetchManagerSuccess: (state, action) => {
      state.loading = false;
      state.managers = action.payload;
    },
    fetchManagerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRestaurantRequest: (state) => {
      state.loading = true;
    },
    fetchRestaurantSuccess: (state, action) => {
      state.loading = false;
      state.restaurant = action.payload;
    },
    fetchRestaurantFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  adminLoginFail,
  adminLoginRequest,
  adminLoginSuccess,
  adminLogoutFail,
  adminLogoutSuccess,
  adminRegisterFail,
  adminRegisterRequest,
  adminRegisterSuccess,
  adminlogoutRequest,
  fetchRoleFailure,
  fetchRoleRequest,
  fetchRoleSuccess,
  fetchCustomersFailure,
  fetchCustomersRequest,
  fetchCustomersSuccess,
  fetchManagerFailure,
  fetchManagerRequest,
  fetchManagerSuccess,
  fetchRestaurantFailure,
  fetchRestaurantRequest,
  fetchRestaurantSuccess
} = adminSlice.actions;
export default adminSlice.reducer;
