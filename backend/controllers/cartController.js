const { Cart, CartItem, Product } = require('../models');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ 
      where: { userId: req.user.userId },
      include: [{
        model: CartItem,
        as: 'items',
        include: [{
          model: Product,
          as: 'product'
        }]
      }]
    });
    
    if (!cart) {
      return res.json({ items: [] });
    }
    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.userId;

    // Check if product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // Check if item already in cart
    const existingItem = await CartItem.findOne({
      where: { 
        cartId: cart.id,
        productId: productId
      }
    });

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      // Add new item
      await CartItem.create({
        cartId: cart.id,
        productId: productId,
        quantity: quantity
      });
    }

    // Return updated cart
    const updatedCart = await Cart.findOne({ 
      where: { userId },
      include: [{
        model: CartItem,
        as: 'items',
        include: [{
          model: Product,
          as: 'product'
        }]
      }]
    });

    res.json({ message: 'Item added to cart', cart: updatedCart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItem = await CartItem.findOne({
      where: { 
        cartId: cart.id,
        productId: productId
      }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await cartItem.destroy();
    } else {
      cartItem.quantity = quantity;
      await cartItem.save();
    }

    // Return updated cart
    const updatedCart = await Cart.findOne({ 
      where: { userId },
      include: [{
        model: CartItem,
        as: 'items',
        include: [{
          model: Product,
          as: 'product'
        }]
      }]
    });

    res.json({ message: 'Cart updated', cart: updatedCart });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Failed to update cart' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const cartItem = await CartItem.findOne({
      where: { 
        cartId: cart.id,
        productId: productId
      }
    });

    if (!cartItem) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    await cartItem.destroy();

    // Return updated cart
    const updatedCart = await Cart.findOne({ 
      where: { userId },
      include: [{
        model: CartItem,
        as: 'items',
        include: [{
          model: Product,
          as: 'product'
        }]
      }]
    });

    res.json({ message: 'Item removed from cart', cart: updatedCart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
};
