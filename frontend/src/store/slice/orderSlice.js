import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderRequest: (state) => {
      state.loading = true;
    },
    orderSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    orderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { orderFail, orderRequest, orderSuccess } = orderSlice.actions;
export default orderSlice.reducer;
