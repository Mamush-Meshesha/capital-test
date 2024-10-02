const express = require("express");
const {
  adminSignUp,
  adminLogin,
  Roles,
  Restaurants,
  getRestaurants,
  adminLogout,
  getRoles,
  getUsers,
  getManager,
  getPermission,
  createRoleWithPermissions,
} = require("../controllers/admin.controller");
const {
  
  protect,
  superAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/admin/signup", adminSignUp);
router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);
router.post("/roles", protect,  Roles);
router.post("/restaurants", protect,superAdmin,  Restaurants);
router.post("/rolepermission", protect,  createRoleWithPermissions);

router.get("/restaurants", protect,  getRestaurants);
router.get("/roles", protect, getRoles);
router.get("/customers", getUsers);
router.get("/managers", protect, getManager);
router.get("/permission", protect,  getPermission);

module.exports = router;
