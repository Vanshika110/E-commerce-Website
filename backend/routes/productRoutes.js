const express = require('express');
const { getAllProducts, getProduct, createProduct } = require('../controllers/productController');
const { uploadProductImage, handleUploadError } = require('../middleware/cloudinaryUpload');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', auth, uploadProductImage, handleUploadError, createProduct);

module.exports = router;
