import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root/rootSaga/rootSaga";
import authReducer from "./slice/authSlice";
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/orderSlice";
import pizzaReducer from "./slice/pizzaSlice";

// Persist config for auth
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "token", "isAuthenticated"],
};

// Persist config for cart
const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: [
    "items",
    "totalQuantity",
    "totalAmount",
    "shippingAddress",
    "paymentMethod",
  ],
};

// Combine reducers with persist
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  order: orderReducer,
  pizzas: pizzaReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;
