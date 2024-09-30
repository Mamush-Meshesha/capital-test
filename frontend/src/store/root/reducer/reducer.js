import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../../slice/userSlice";
import  adminSlice  from "../../slice/adminSlice";
import  ManagerSlice  from "../../slice/manaSlice";

const rootReducer = combineReducers({
  customer: userSlice,
  admin: adminSlice,
  manager: ManagerSlice
});

export default rootReducer;
