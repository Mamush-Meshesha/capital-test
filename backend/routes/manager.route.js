const express = require("express")
const {
  managerSignup,
  managerLogin,
  addMenu,
  addTopping,
  getCustomerOrder,
  uploadImage,
} = require("../controllers/manager.controller");
const {   protectManager, protect } = require("../middlewares/authMiddleware");
const multer = require("multer");
const router = express.Router()
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

router.post("/manager/signup", protect, managerSignup);
router.post("/manager/login", managerLogin)
router.post("/menu/:menuId/topping", protectManager, addTopping);
router.post("/restaurant/menu", protectManager,protect, addMenu);
router.get("/customers/orders",protectManager,protect, getCustomerOrder )
router.post("/upload", upload.single("image"), uploadImage);

module.exports = router