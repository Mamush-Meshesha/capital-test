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
  getOrders,
} = require("../controllers/admin.controller");
const { protect, superAdmin } = require("../middlewares/authMiddleware");
const {
  abilityMiddleware,
  authorize,
} = require("../middlewares/defineAbilities");

const router = express.Router();

router.post("/admin/signup", adminSignUp);
router.post("/admin/login", adminLogin);
router.post("/admin/logout", adminLogout);
router.use(abilityMiddleware);
router.post("/roles", protect, authorize("create", "Role"), Roles);
router.post(
  "/restaurants",
  protect,
  superAdmin,
  authorize("register", "Restaurant"),
  Restaurants
);
router.post(
  "/rolepermission",
  protect,
  authorize("create", "Role"),
  createRoleWithPermissions
);

router.get("/restaurants", protect, getRestaurants);
router.get("/roles", protect, getRoles);
router.get("/customers", getUsers);
router.get("/managers", protect, getManager);
router.get("/orders", protect, getOrders);
router.get("/permission", protect, getPermission);

module.exports = router;
