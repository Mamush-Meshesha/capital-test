import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  adminLoginFail,
  adminLoginRequest,
  adminLoginSuccess,
  adminLogoutFail,
  adminlogoutRequest,
  adminLogoutSuccess,
  adminRegisterRequest,
  fetchCustomersFailure,
  fetchCustomersRequest,
  fetchCustomersSuccess,
  fetchManagerFailure,
  fetchManagerRequest,
  fetchRoleFailure,
  fetchRoleRequest,
  fetchRoleSuccess,
  fetchManagerSuccess,
  fetchRestaurantRequest,
  fetchRestaurantFailure,
  fetchRestaurantSuccess,
  createRolePermissionRequest,
  createRolePermissionSuccess,
  createRolePermissionFailure,
  createRestaurantRequest,
  createRestaurantSuccess,
  createRestaurantFailure,
} from "../slice/adminSlice";

function* adminSignUp(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:3000/api/admin/signup",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    yield put(res.data);
  } catch (error) {
    yield put(error.message);
  }
}

function* adminLogin(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:3000/api/admin/login",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    yield put(adminLoginSuccess(res.data));
  } catch (error) {
    yield put(adminLoginFail(error.message));
  }
}

function* adminLogout(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:3000/api/admin/logout",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    yield put(adminLogoutSuccess(res.data));
  } catch (error) {
    yield put(adminLogoutFail(error.message));
  }
}

function* fetchRoles() {
  try {
    const res = yield call(axios.get, "http://localhost:3000/api/roles", {
      withCredentials: true,
    });
    yield put(fetchRoleSuccess(res.data));
  } catch (error) {
    yield put(fetchRoleFailure(error.message));
  }
}

function* fetchCustomers() {
  try {
    const res = yield call(axios.get, "http://localhost:3000/api/customers");
    yield put(fetchCustomersSuccess(res.data));
  } catch (error) {
    yield put(fetchCustomersFailure(error.message));
  }
}

function* fetchManager() {
  try {
    const res = yield call(axios.get, "http://localhost:3000/api/managers", {
      withCredentials: true,
    });
    yield put(fetchManagerSuccess(res.data));
  } catch (error) {
    yield put(fetchManagerFailure(error.message));
  }
}

function* getRestaurants() {
  try {
    const res = yield call(axios.get, "http://localhost:3000/api/restaurants", {
      withCredentials: true,
    });
    yield put(fetchRestaurantSuccess(res.data));
  } catch (error) {
    yield put(fetchRestaurantFailure(error.message));
  }
}

function* createRole(action) {
  try {
    const res = yield call(axios.post, "http://localhost:3000/api/rolepermission", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    yield put(createRolePermissionSuccess(res.data));
  } catch (error) {
    yield put(createRolePermissionFailure(error.message));
  }
}

function* createRestaurant(action) {
  try {
    const res = yield call(axios.post, "", action.payload, {
      headers: {
          "Content-Type": "application/json"
      },
      withCredentials: true
    })
    yield put(createRestaurantSuccess(res.data))
  } catch (error) {
    yield put(createRestaurantFailure(error.message))
  }
}

function* watchAdminSignup() {
  yield takeLatest(adminRegisterRequest, adminSignUp);
}
function* watchAdminLogin() {
  yield takeLatest(adminLoginRequest, adminLogin);
}

function* watchAdminLogout() {
  yield takeLatest(adminlogoutRequest, adminLogout);
}

function* watchFetchRole() {
  yield takeLatest(fetchRoleRequest, fetchRoles);
}
function* watchFetchCustomer() {
  yield takeLatest(fetchCustomersRequest, fetchCustomers);
}

function* watchFetchManager() {
  yield takeLatest(fetchManagerRequest, fetchManager);
}

function* watchFetchRestaurant() {
  yield takeLatest(fetchRestaurantRequest, getRestaurants);
}

function* watchCreateRoleWithPermision() {
  yield takeLatest(createRolePermissionRequest, createRole);
}
function* watchCreateRestaurant() {
  yield takeLatest(createRestaurantRequest, createRestaurant)
}
export {
  watchAdminLogin,
  watchAdminSignup,
  watchAdminLogout,
  watchFetchRole,
  watchFetchCustomer,
  watchFetchManager,
    watchFetchRestaurant,
  watchCreateRoleWithPermision,
  watchCreateRestaurant
};
