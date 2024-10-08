import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAdminLogin: localStorage.getItem("isAdminLogin")
    ? JSON.parse(localStorage.getItem("isAdminLogin"))
    : null,
  isAdmin: null,
  error: null,
  registeredAdmin: [],
  customers: [],
  managers: [],
  restaurant: [],
  rolePermission: [],
  createRestaurants: [],
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
      state.isAdmin = localStorage.setItem("isAdminLogin", JSON.stringify(action.payload));
    },
    adminLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAdminLogin = false
    },
    adminlogoutRequest: (state) => {
      state.loading = true;
    },
    adminLogoutSuccess: (state) => {
      state.loading = false;
      state.isAdminLogin = false;
      state.isAdmin = localStorage.removeItem("isAdminLogin")
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

    createRolePermissionRequest: (state) => {
      state.loading = true;
    },
    createRolePermissionSuccess: (state, action) => {
      state.loading = false;
      state.rolePermission = action.payload;
    },
    createRolePermissionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createRestaurantRequest: (state) => {
      state.loading = true;
    },
    createRestaurantSuccess: (state, action) => {
      state.loading = false;
      state.createRestaurants = action.payload;
    },
    createRestaurantFailure: (state, action) => { 
      state.loading = false
      state.error = action.payload
    }
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
  fetchRestaurantSuccess,
  createRolePermissionFailure,
  createRolePermissionRequest,
  createRolePermissionSuccess,
  createRestaurantFailure,
  createRestaurantRequest,
  createRestaurantSuccess
} = adminSlice.actions;
export default adminSlice.reducer;
