const express = require("express")
const router = express.Router()
const {getPizza, getRestaurants, getCustomerOrder} = require("../controllers/pizza.controller");
const { protectCustomer } = require("../middlewares/authMiddleware");
router.get("/piza", getPizza);
router.get("/topres", getRestaurants)
router.get("/order-history",protectCustomer, getCustomerOrder )


module.exports = router
