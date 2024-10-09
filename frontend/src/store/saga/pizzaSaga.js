import axios from "axios"
import { put, call, takeLatest } from "redux-saga/effects";
import { getPizzas, getPizzasFailure, getPizzasSuccess, getTopRestaurant, getTopRestaurantFailure, getTopRestaurantSuccess } from "../slice/pizzaSlice";


function* fetchPizza() {
    try {
        const res = yield call(axios.get, "https://capital-test.onrender.com/api/piza")
        yield put(getPizzasSuccess(res.data))
    } catch (error) {
        yield put(getPizzasFailure(error.message))
    }

}

function* fetchTopRestaurant() {
  try {
    const res = yield call(axios.get, "https://capital-test.onrender.com/api/topres");
    yield put(getTopRestaurantSuccess(res.data));
  } catch (error) {
    yield put(getTopRestaurantFailure(error.message));
  }
}


function* watchFetchPizza() {
    yield takeLatest(getPizzas, fetchPizza)
}
function* watchFetchTopRestaurant() {
  yield takeLatest(getTopRestaurant, fetchTopRestaurant);
}

export {watchFetchPizza,watchFetchTopRestaurant}