import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "../slice/authSlice";
import {
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  orderHistoryFailure,
  orderHistoryRequest,
  orderHistorySuccess,
  orderStatusFailure,
  orderStatusRequest,
  orderStatusSuccess,
} from "../slice/userSlice";
import { put, call, takeLatest } from "redux-saga/effects";
import api from "../../utils/api";

function* loginCustomer(action) {
  try {
    const { role, ...creds } = action.payload || {};
    const endpoint = "/api/auth/login";

    const res = yield call(api.post, endpoint, creds, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(loginSuccess(res.data));
  } catch (error) {
    yield put(loginFailure(error?.response?.data || error.message));
  }
}

function* registerCustomer(action) {
  try {
    const res = yield call(api.post, "/api/auth/register", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(registerSuccess(res.data));
  } catch (error) {
    yield put(registerFailure(error?.response?.data || error.message));
  }
}

function* logoutUser(action) {
  try {
    const res = yield call(api.post, "/api/customer/logout", action.payload);
    yield put(logoutSuccess(res.data));
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

function* fetchOrderHistory() {
  try {
    const res = yield call(api.get, "/api/order-history");
    yield put(orderHistorySuccess(res.data));
  } catch (error) {
    yield put(orderHistoryFailure(error.message));
  }
}

function* fetchOrderStatus() {
  try {
    const res = yield call(api.get, "/api/order-status");
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
  watchLogout,
};
