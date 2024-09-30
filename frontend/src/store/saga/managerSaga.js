import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  managerFetchOrdersRequest,
  managerFetchOrdersSuccess,
  managerLoginFail,
  managerLoginRequest,
  managerLoginSuccess,
  managerOrdersFail,
  managerRegisterFail,
  managerRegisterRequest,
  managerRegisterSuccess,
} from "../slice/manaSlice";

function* managerSignup(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:3000/api/manager/signup",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    yield put(managerRegisterSuccess(res.data));
  } catch (error) {
    yield put(managerRegisterFail(error.message));
  }
}

function* managerLogin(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:3000/api/manager/login",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    yield put(managerLoginSuccess(res.data));
  } catch (error) {
    yield put(managerLoginFail(error.message));
  }
}

function* fetchManagerOrders() {
  try {
    const res = yield call(
      axios.get,
      "http://localhost:3000/api/customers/orders"
    );
    yield put(managerFetchOrdersSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    yield put(managerOrdersFail(error.message));
  }
}

function* watchManagerSignup() {
  yield takeLatest(managerRegisterRequest, managerSignup);
}

function* watchManagerLogin() {
  yield takeLatest(managerLoginRequest, managerLogin);
}

function* watchFetchManagerOrder() {
  yield takeLatest(managerFetchOrdersRequest, fetchManagerOrders);
}

export { watchManagerLogin, watchManagerSignup, watchFetchManagerOrder };
