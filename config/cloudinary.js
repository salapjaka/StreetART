const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'ddkgpstvf',
  api_key: '711477868713751',
  api_secret: 'UucDBF0K-y0Q80D81HV3FL1RjTo'
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'street-art', // The name of the folder in cloudinary
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;