const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// All cart routes require authentication
router.use(auth);

// Routes
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove/:productId', removeFromCart);

module.exports = router;
