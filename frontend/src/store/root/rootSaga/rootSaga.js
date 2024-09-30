import { all } from "redux-saga/effects";
import { watchCustomerLogin, watchCustomerSignup } from "../../saga/customerSaga";
import {
  watchAdminLogin,
  watchAdminLogout,
  watchAdminSignup,
  watchFetchCustomer,
  watchFetchManager,
  watchFetchRestaurant,
  watchFetchRole,
} from "../../saga/adminSaga";
import { watchFetchManagerOrder,  watchManagerLogin, watchManagerSignup } from "../../saga/managerSaga";

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
        watchFetchRestaurant()
    ])
}

export default rootSaga