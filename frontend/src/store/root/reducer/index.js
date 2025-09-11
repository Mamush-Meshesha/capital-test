import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../../../store/slice/authSlice';
import cartReducer from '../../../store/slice/cartSlice';
import orderReducer from '../../../store/slice/orderSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  // Add other reducers here
});

export default rootReducer;
