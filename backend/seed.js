const dotenv = require('dotenv');
const { sequelize, Product } = require('./models');

dotenv.config();

// Sample products data
const sampleProducts = [
  {
    name: 'Laptop',
    description: 'High-performance laptop for work and gaming',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
    stock: 10,
    category: 'Electronics'
  },
  {
    name: 'Smartphone',
    description: 'Latest smartphone with advanced features',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
    stock: 25,
    category: 'Electronics'
  },
  {
    name: 'Headphones',
    description: 'Wireless noise-cancelling headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    stock: 50,
    category: 'Electronics'
  },
  {
    name: 'T-Shirt',
    description: 'Comfortable cotton t-shirt',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop',
    stock: 100,
    category: 'Clothing'
  },
  {
    name: 'Jeans',
    description: 'Premium denim jeans',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop',
    stock: 75,
    category: 'Clothing'
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes for daily exercise',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
    stock: 40,
    category: 'Footwear'
  }
];

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');
    
    // Insert sample products
    await Product.bulkCreate(sampleProducts);
    console.log('Sample products inserted successfully');
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
