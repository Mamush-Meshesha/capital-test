import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../../slice/userSlice";
import  adminSlice  from "../../slice/adminSlice";
import  ManagerSlice  from "../../slice/manaSlice";
import pizzaSlice from "../../slice/pizzaSlice";
import orderSlice from "../../slice/orderSlice";

const rootReducer = combineReducers({
  customer: userSlice,
  admin: adminSlice,
  manager: ManagerSlice,
  pizzas: pizzaSlice,
  orders: orderSlice
});

export default rootReducer;
