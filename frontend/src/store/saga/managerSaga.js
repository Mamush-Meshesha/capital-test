import api from "../../utils/api";
import { put, call, takeLatest } from "redux-saga/effects";
import {
  createMenuToppingFailure,
  createMenuToppingRequest,
  createMenuToppingSuccess,
  fetchPermissionFailure,
  fetchPermissionRequest,
  fetchPermissionSuccess,
  managerFetchOrdersRequest,
  managerFetchOrdersSuccess,
  managerLoginFail,
  managerLoginRequest,
  managerLoginSuccess,
  managerOrdersFail,
  managerRegisterFail,
  managerRegisterRequest,
  managerRegisterSuccess,
  updateOrderStatus,
  updateOrderStatusFailure,
  updateOrderStatusSuccess,
  uploadImageImgurFailure,
  uploadImageImgurRequest,
  uploadImageImgurSuccess,
} from "../slice/manaSlice";

function* managerSignup(action) {
  try {
    const res = yield call(api.post, "/api/manager/signup", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(managerRegisterSuccess(res.data));
  } catch (error) {
    yield put(managerRegisterFail(error.message));
  }
}

function* managerLogin(action) {
  try {
    const res = yield call(api.post, "/api/manager/login", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    yield put(managerLoginSuccess(res.data));
  } catch (error) {
    yield put(managerLoginFail(error.message));
  }
}

function* fetchManagerOrders() {
  try {
    const res = yield call(api.get, "/api/customers/orders");
    yield put(managerFetchOrdersSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    yield put(managerOrdersFail(error.message));
  }
}

function* fetchPermission() {
  try {
    const res = yield call(api.get, "/api/permission");
    yield put(fetchPermissionSuccess(res.data));
  } catch (error) {
    yield put(fetchPermissionFailure(error.message));
  }
}

function* createMenuTopping(action) {
  try {
    const res = yield call(api.post, "/api/restaurant/menu", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(createMenuToppingSuccess(res.data));
  } catch (error) {
    yield put(createMenuToppingFailure(error.message));
  }
}

function* uploadImage(action) {
  try {
    const res = yield call(api.post, "/api/upload", action.payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    yield put(uploadImageImgurSuccess(res.data));
  } catch (error) {
    yield put(uploadImageImgurFailure(error.message));
  }
}

function* upadateOrderStatus(action) {
  const { orderId, status } = action.payload;
  try {
    const res = yield call(
      api.put,
      `/api/order/${orderId}/status`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    yield put(
      updateOrderStatusSuccess({ orderId, newStatus: res.data.status })
    );
  } catch (error) {
    yield put(updateOrderStatusFailure(error.message));
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

function* watchFetchPermission() {
  yield takeLatest(fetchPermissionRequest, fetchPermission);
}

function* watchCreateMenuTopping() {
  yield takeLatest(createMenuToppingRequest, createMenuTopping);
}

function* watchUploadImage() {
  yield takeLatest(uploadImageImgurRequest, uploadImage);
}

function* watchUpdateOrderStatus() {
  yield takeLatest(updateOrderStatus, upadateOrderStatus);
}

export {
  watchManagerLogin,
  watchManagerSignup,
  watchFetchManagerOrder,
  watchFetchPermission,
  watchCreateMenuTopping,
  watchUploadImage,
  watchUpdateOrderStatus,
};
