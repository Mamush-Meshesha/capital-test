import { all } from "redux-saga/effects";
import {
  watchCustomerLogin,
  watchCustomerSignup,
  watchFetchOrderHistory,
  watchfetchOrderStatus,
  watchLogout,
} from "../../saga/customerSaga";
import {
  watchAdminLogin,
  watchAdminLogout,
  watchAdminSignup,
  watchCreateRestaurant,
  watchCreateRoleWithPermision,
  watchFetchCustomer,
  watchFetchManager,
  watchFetchRestaurant,
  watchFetchRole,
  watchFetchOrders,
} from "../../saga/adminSaga";
import {
  watchCreateMenuTopping,
  watchFetchManagerOrder,
  watchFetchPermission,
  watchManagerLogin,
  watchManagerSignup,
  watchUpdateOrderStatus,
  watchUploadImage,
} from "../../saga/managerSaga";
import { watchFetchPizza, watchFetchTopRestaurant } from "../../saga/pizzaSaga";
import { watchOrderPizza } from "../../saga/orderSaga";

function* rootSaga() {
  yield all([
    watchCustomerLogin(),
    watchCustomerSignup(),
    watchAdminLogin(),
    watchAdminSignup(),
    watchManagerLogin(),
    watchManagerSignup(),
    watchAdminLogout(),
    watchFetchManagerOrder(),
    watchFetchRole(),
    watchFetchCustomer(),
    watchFetchManager(),
    watchFetchRestaurant(),
    watchFetchPermission(),
    watchCreateRoleWithPermision(),
    watchCreateMenuTopping(),
    watchUploadImage(),
    watchFetchPizza(),
    watchOrderPizza(),
    watchFetchTopRestaurant(),
    watchFetchOrderHistory(),
    watchfetchOrderStatus(),
    watchUpdateOrderStatus(),
    watchCreateRestaurant(),
    watchFetchOrders(),
    watchLogout(),
  ]);
}

export default rootSaga;
