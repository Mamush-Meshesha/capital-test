const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
console.log("api key", process.env.CLOUDINARY_KEY);

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "piza",
    allowedFormats: ["jpg", "png", "jpeg", "webm"],
  },
});

module.exports = { storage };
