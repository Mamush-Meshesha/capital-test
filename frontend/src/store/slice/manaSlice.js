import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isManagerLogin: false,
  manager: null,
  error: null,
  registeredManager: [],
  orders: [],
  roles: []
};

export const ManagerSlice = createSlice({
  name: "manager",
  initialState,
  reducers: {
    managerLoginRequest: (state) => {
      state.loading = true;
      state.isManagerLogin = false;
    },
    managerLoginSuccess: (state, action) => {
      state.loading = false;
      state.isManagerLogin = true;
      state.manager = action.payload;
    },
    managerLoginFail: (state, action) => {
      state.loading = false;
      state.isManagerLogin = false;
      state.error = action.payload;
    },
    managerLogoutSuccess: (state) => {
      state.loading = false;
      state.isManagerLogin = false;
      state.manager = null;
    },
    managerLogoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    managerRegisterRequest: (state) => {
      state.loading = true;
      state.isManagerLogin = false;
    },
    managerRegisterSuccess: (state, action) => {
      state.loading = false;
      state.isManagerLogin = true;
      state.registeredManager = action.payload;
    },
    managerRegisterFail: (state, action) => {
      state.loading = false;
      state.isManagerLogin = false;
      state.error = action.payload;
    },


    // fetch orders
    managerFetchOrdersRequest: (state) => { 
      state.loading = true
    },
    managerFetchOrdersSuccess: (state, action) => {
      state.loading = false,
        state.orders = action.payload
      state.error = null
    },
    managerOrdersFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

  },
});

export const {
  managerLoginFail,
  managerLoginRequest,
  managerLoginSuccess,
  managerLogoutFail,
  managerLogoutSuccess,
  managerRegisterFail,
  managerRegisterRequest,
  managerRegisterSuccess,
  managerFetchOrdersRequest,
  managerFetchOrdersSuccess,
  managerOrdersFail,
  fetchRoleFailure,
  fetchRoleRequest,
  fetchRoleSuccess
} = ManagerSlice.actions;
export default ManagerSlice.reducer;
