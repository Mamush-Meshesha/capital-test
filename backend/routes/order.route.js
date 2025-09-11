const express = require("express");
const router = express.Router();
const {
  createOrder,
  getCustomerOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");
const { protect } = require("../middlewares/authMiddleware");

// Create order (protected route)
router.post("/orders", protect, createOrder);

// Get customer orders (protected route)
router.get("/orders/customer/:customerId", protect, getCustomerOrders);

// Get all orders (admin/manager only)
router.get("/orders", protect, getAllOrders);

// Update order status (admin/manager only)
router.put("/orders/:orderId/status", protect, updateOrderStatus);

module.exports = router;
