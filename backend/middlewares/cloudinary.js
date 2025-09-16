const cloudinary = require('cloudinary').v2;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: '' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};



cloudinary.upload = cloudinaryUpload;

module.exports = cloudinary;




