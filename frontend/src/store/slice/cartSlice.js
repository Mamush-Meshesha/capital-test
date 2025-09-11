import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  shippingAddress: null,
  paymentMethod: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { pizza, toppings = [], quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => 
          item.pizza.id === pizza.id && 
          JSON.stringify(item.toppings) === JSON.stringify(toppings)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          pizza,
          toppings,
          quantity,
        });
      }
      
      // Update totals
      state.totalQuantity += quantity;
      state.totalAmount += pizza.price * quantity;
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    removeFromCart: (state, action) => {
      const { pizzaId, toppings } = action.payload;
      const existingItem = state.items.find(
        (item) => 
          item.pizza.id === pizzaId && 
          JSON.stringify(item.toppings) === JSON.stringify(toppings)
      );
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.pizza.price * existingItem.quantity;
        state.items = state.items.filter(
          (item) => 
            item.pizza.id !== pizzaId || 
            JSON.stringify(item.toppings) !== JSON.stringify(toppings)
        );
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    updateQuantity: (state, action) => {
      const { pizzaId, toppings, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => 
          item.pizza.id === pizzaId && 
          JSON.stringify(item.toppings) === JSON.stringify(toppings)
      );
      
      if (existingItem) {
        state.totalQuantity += quantity - existingItem.quantity;
        state.totalAmount += (quantity - existingItem.quantity) * existingItem.pizza.price;
        existingItem.quantity = quantity;
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.shippingAddress = null;
      state.paymentMethod = '';
      
      // Clear from localStorage
      localStorage.removeItem('cart');
    },
    
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    
    // Load cart from localStorage
    loadCart: (state) => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        return { ...JSON.parse(savedCart) };
      }
      return state;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;
