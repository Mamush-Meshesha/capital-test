import api from "../../utils/api";
import { put, call, takeLatest } from "redux-saga/effects";
import { orderFail, orderRequest, orderSuccess } from "../slice/orderSlice";

function* orderPizza(action) {
  try {
    const res = yield call(api.post, "/api/customer/order", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(orderSuccess(res.data));
  } catch (error) {
    yield put(orderFail(error.message));
  }
}

function* watchOrderPizza() {
  yield takeLatest(orderRequest, orderPizza);
}

export { watchOrderPizza };
