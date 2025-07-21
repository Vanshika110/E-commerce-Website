const { Product } = require('../models');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Create product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image: req.file ? `/uploads/products/${req.file.filename}` : null
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};
