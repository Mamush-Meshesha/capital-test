import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  orderHistoryFailure,
  orderHistoryRequest,
  orderHistorySuccess,
  orderStatusFailure,
  orderStatusRequest,
  orderStatusSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "../slice/userSlice";
import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* loginCustomer(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:3000/api/customer/login",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    yield put(loginSuccess(res.data));
  } catch (error) {
    yield put(loginFailure(error.data));
  }
}

function* registerCustomer(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:3000/api/customers/signup",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    yield put(registerSuccess(res.data));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* logoutUser(action) {
  try {
    const res = yield call(axios.post, "http://localhost:3000/api/customer/logout", action.payload)
    yield put(logoutSuccess(res.data));
  } catch (error) {
    yield put(logoutFailure(error.message))
  }
}

function* fetchOrderHistory() {
  try {
    const res = yield call(
      axios.get,
      "http://localhost:3000/api/order-history",
      {
        withCredentials: true,
      }
    );
    yield put(orderHistorySuccess(res.data));
  } catch (error) {
    yield put(orderHistoryFailure(error.message));
  }
}

function* fetchOrderStatus() {
  try {
    const res = yield call(axios.get, "http://localhost:3000/api/order-status");
    yield put(orderStatusSuccess(res.data));
  } catch (error) {
    yield put(orderStatusFailure(error.message));
  }
}

//watcher

function* watchCustomerLogin() {
  yield takeLatest(loginStart, loginCustomer);
}
function* watchCustomerSignup() {
  yield takeLatest(registerStart, registerCustomer);
}

function* watchLogout() {
  yield takeLatest(logoutRequest, logoutUser);
}

function* watchFetchOrderHistory() {
  yield takeLatest(orderHistoryRequest, fetchOrderHistory);
}

function* watchfetchOrderStatus() {
  yield takeLatest(orderStatusRequest, fetchOrderStatus);
}
export {
  watchCustomerLogin,
  watchCustomerSignup,
  watchFetchOrderHistory,
  watchfetchOrderStatus,
  watchLogout
};
