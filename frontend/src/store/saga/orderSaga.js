import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import { orderFail, orderRequest, orderSuccess } from "../slice/orderSlice";

function* orderPizza(action) {
    try {
        const res = yield call(axios.post, "http://localhost:3000/api/customer/order", action.payload, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
        yield put(orderSuccess(res.data))
    } catch (error) {
        yield put(orderFail(error.message))
    }
}


function* watchOrderPizza() {
    yield takeLatest(orderRequest, orderPizza)
}



export {watchOrderPizza, }