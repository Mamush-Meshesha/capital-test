const express = require("express");
const { customerSignup, customerLogin, customerOrder } = require("../controllers/user.controller");
const { protectCustomer } = require("../middlewares/authMiddleware");
const router = express.Router()

router.post("/customers/signup", customerSignup);
router.post("/customer/login", customerLogin);
router.post("/customer/order", protectCustomer, customerOrder);
module.exports = router