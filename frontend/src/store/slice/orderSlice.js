import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [],
  selectedPizza: [],
  selectedTopping: [],
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
    selectPizza: (state, action) => {
      state.selectedPizza = action.payload;
    },
    clearSelectedPizza: (state) => {
      state.selectedPizza = null;
    },
    selectedTopping: (state, action) => {
      state.selectedTopping = action.payload;
    },
    clearSelectedTopping: (state, action) => {
      state.selectedTopping = action.payload;
    },
  },
});

export const {
  orderFail,
  orderRequest,
  orderSuccess,
  clearSelectedPizza,
  clearSelectedTopping,
  selectPizza,
  selectedTopping,
} = orderSlice.actions;
export default orderSlice.reducer;
