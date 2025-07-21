const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};

// Profile image upload configuration
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/profiles');
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Product image upload configuration
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/products');
    ensureDirectoryExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
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

// Upload configurations
const uploadProfileImage = multer({
  storage: profileStorage,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: imageFileFilter
}).single('profileImage');

const uploadProductImage = multer({
  storage: productStorage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB limit for product images
  },
  fileFilter: imageFileFilter
}).single('productImage');

// Multiple product images upload
const uploadMultipleProductImages = multer({
  storage: productStorage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB limit per image
  },
  fileFilter: imageFileFilter
}).array('productImages', 5); // Max 5 images

module.exports = {
  uploadProfileImage,
  uploadProductImage,
  uploadMultipleProductImages
};
