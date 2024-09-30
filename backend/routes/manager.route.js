const express = require("express")
const {
  managerSignup,
  managerLogin,
  addMenu,
  addTopping,
  getCustomerOrder,
  upload,
} = require("../controllers/manager.controller");
const { superAdmin, protect, protectManager } = require("../middlewares/authMiddleware");
const multer = require("multer");
const {storage} = require("../cloudinary/cloudinary")
const router = express.Router()
const uploads = multer({ storage: storage });

router.post("/manager/signup", protect, superAdmin, managerSignup);
router.post("/manager/login", managerLogin)
router.post("/menu/:menuId/topping", protectManager, addTopping);
router.post("/restaurant/menu", protectManager, addMenu);
router.get("/customers/orders",protectManager,protect, getCustomerOrder )
router.post("/upload", uploads.array("image"), upload);

module.exports = router