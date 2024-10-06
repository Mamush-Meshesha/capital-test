const express = require("express");
const { customerSignup, customerLogin, customerOrder, fetchOrderEnum, updateOrderStatus } = require("../controllers/user.controller");
const { protectCustomer, protect } = require("../middlewares/authMiddleware");
const router = express.Router()

router.post("/customers/signup", customerSignup);
router.post("/customer/login", customerLogin);
router.post("/customer/order", protectCustomer, customerOrder);
router.get("/order-status", fetchOrderEnum)
router.put("/order/:orderId/status", updateOrderStatus)
module.exports = router