const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function addSampleProducts() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    
    console.log('✅ Connected to database');
    
    // Clear existing products
    await connection.execute('DELETE FROM products');
    console.log('✅ Cleared existing products');
    
    // Insert sample products
    const products = [
      ['Laptop', 'High-performance laptop for work and gaming', 999.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop', 10, 'Electronics'],
      ['Smartphone', 'Latest smartphone with advanced features', 699.99, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop', 25, 'Electronics'],
      ['Headphones', 'Wireless noise-cancelling headphones', 199.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop', 50, 'Electronics'],
      ['T-Shirt', 'Comfortable cotton t-shirt', 29.99, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop', 100, 'Clothing'],
      ['Jeans', 'Premium denim jeans', 79.99, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop', 75, 'Clothing'],
      ['Running Shoes', 'Comfortable running shoes for daily exercise', 129.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop', 40, 'Footwear']
    ];
    
    for (const product of products) {
      await connection.execute(
        'INSERT INTO products (name, description, price, image, stock, category, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
        product
      );
    }
    
    console.log('✅ Sample products inserted successfully!');
    
    // Verify products were inserted
    const [rows] = await connection.execute('SELECT id, name, image FROM products');
    console.log('📋 Products in database:');
    rows.forEach(row => {
      console.log(`  ${row.id}: ${row.name} - ${row.image}`);
    });
    
    await connection.end();
    console.log('✅ Database connection closed');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addSampleProducts();
