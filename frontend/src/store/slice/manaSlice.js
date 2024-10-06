import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isManagerLogin: false,
  manager: null,
  error: null,
  registeredManager: [],
  orders: [],
  roles: [],
  permissions: [],
  menuTopping: [],
  image: [],
  updatedStatus: []
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

    fetchPermissionRequest: (state) => {
      state.loading = true
    },
    fetchPermissionSuccess: (state, action) => {
      state.loading = false
      state.permissions = action.payload
    },
    fetchPermissionFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    createMenuToppingRequest: (state) => {
      state.loading = true
    },
    createMenuToppingSuccess: (state, action) => {
      state.menuTopping = action.payload
    },
    createMenuToppingFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },

    // imgur image upload

    uploadImageImgurRequest: (state) => {
      state.loading = true

    },
    uploadImageImgurSuccess: (state, action) => {
      state.image = action.payload
      state.loading = false
    },
    uploadImageImgurFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    updateOrderStatus: (state) => {
      state.loading = true
    },
    updateOrderStatusSuccess: (state, action) => {
      state.loading = false
      state.updatedStatus = action.payload
    },
    updateOrderStatusFailure: (state,action) =>{
      state.loading = false
      state.error = action.payload
    }
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
  fetchRoleSuccess,
  fetchPermissionFailure,
  fetchPermissionRequest,
  fetchPermissionSuccess,
  createMenuToppingFailure,
  createMenuToppingRequest,
  createMenuToppingSuccess,
  uploadImageImgurFailure,
  uploadImageImgurRequest,
  uploadImageImgurSuccess,
  updateOrderStatus,
  updateOrderStatusFailure,
  updateOrderStatusSuccess
} = ManagerSlice.actions;
export default ManagerSlice.reducer;
