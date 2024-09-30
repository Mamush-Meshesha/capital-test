const express = require("express")
const { adminSignUp, adminLogin, Roles, Restaurants, getRestaurants, adminLogout, getRoles, getUsers, getManager } = require("../controllers/admin.controller")
const { protect, superAdmin, protectManager } = require("../middlewares/authMiddleware")

const router = express.Router()

router.post("/admin/signup", adminSignUp)
router.post("/admin/login", adminLogin)
router.post("/admin/logout", adminLogout)
router.post("/roles", protect, superAdmin, Roles)
router.post("/restaurants", protect, superAdmin, Restaurants);
router.get("/restaurants", protect, superAdmin, getRestaurants);

router.get("/roles", protect, getRoles)
router.get("/customers", getUsers)
router.get("/managers", protect,getManager)

module.exports = router