const express = require('express');
const { signup, signin, getProfile } = require('../controllers/authController');
const { uploadProfileImage, handleUploadError } = require('../middleware/cloudinaryUpload');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/signup', uploadProfileImage, handleUploadError, signup);
router.post('/signin', signin);
router.get('/profile', auth, getProfile);

module.exports = router;
