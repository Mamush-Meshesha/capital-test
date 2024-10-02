import {
  loginFailure,
  loginStart,
  loginSuccess,
  orderHistoryFailure,
  orderHistoryRequest,
  orderHistorySuccess,
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
        withCredentials: true
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
        withCredentials: true
      }
    );
    yield put(registerSuccess(res.data));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* fetchOrderHistory() {
  try {
    const res = yield call(axios.get, "http://localhost:3000/api/order-history", {
      withCredentials: true
    })
    yield put(orderHistorySuccess(res.data))
  } catch (error) {
    yield put(orderHistoryFailure(error.message))
  }
}

//watcher

function* watchCustomerLogin() {
  yield takeLatest(loginStart, loginCustomer);
}
function* watchCustomerSignup() {
  yield takeLatest(registerStart, registerCustomer);
}

function* watchFetchOrderHistory() {
  yield takeLatest(orderHistoryRequest, fetchOrderHistory)
}
export { watchCustomerLogin, watchCustomerSignup, watchFetchOrderHistory };
