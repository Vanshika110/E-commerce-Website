const { sequelize, Product } = require('./models');

async function createSampleProducts() {
  try {
    await sequelize.sync({ force: false });
    
    // Clear existing products
    await Product.destroy({ where: {} });
    
    // Create sample products with working images
    const products = await Product.bulkCreate([
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
      }
    ]);
    
    console.log('✅ Sample products created successfully!');
    console.log('Products:', products.map(p => ({ id: p.id, name: p.name, image: p.image })));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating products:', error);
    process.exit(1);
  }
}

createSampleProducts();
