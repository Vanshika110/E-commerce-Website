const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary storage for profile images
const profileCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce/profiles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 400, height: 400, crop: 'fill' },
      { quality: 'auto' }
    ]
  }
});

// Cloudinary storage for product images
const productCloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [
      { width: 800, height: 600, crop: 'fill' },
      { quality: 'auto' }
    ]
  }
});

// File filter for images
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (JPEG, JPG, PNG, GIF, WebP) are allowed!'));
  }
};

// Multer upload configurations
const uploadProfileImage = multer({
  storage: profileCloudinaryStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
}).single('profileImage');

const uploadProductImage = multer({
  storage: productCloudinaryStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
}).single('image');

// Error handling middleware
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
  }
  
  if (error.message) {
    return res.status(400).json({ error: error.message });
  }
  
  next(error);
};

module.exports = {
  uploadProfileImage,
  uploadProductImage,
  handleUploadError,
  cloudinary
};
