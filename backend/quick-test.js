// Simple test to check if the issue is with server startup
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('🔍 Environment Variables Check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '***' : 'NOT SET');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'EMPTY');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('');

// Test if we can import required modules
try {
  console.log('📦 Testing module imports...');
  const mysql = require('mysql2/promise');
  const { Sequelize } = require('sequelize');
  console.log('✅ All modules imported successfully');
  
  // Test basic Sequelize connection
  console.log('🔗 Testing Sequelize connection...');
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: parseInt(process.env.DB_PORT),
      logging: false
    }
  );
  
  console.log('✅ Sequelize instance created');
  
  // Test connection
  sequelize.authenticate()
    .then(() => {
      console.log('✅ Database connection successful!');
      process.exit(0);
    })
    .catch(err => {
      console.error('❌ Database connection failed:');
      console.error('Error:', err.message);
      console.error('Code:', err.original?.code);
      
      // Specific error handling
      if (err.original?.code === 'ER_ACCESS_DENIED_ERROR') {
        console.log('\n🔧 ACCESS DENIED - Your MySQL credentials are incorrect.');
        console.log('Solutions:');
        console.log('1. Open MySQL Workbench and test the connection');
        console.log('2. Try these common passwords: "", "root", "password", "admin"');
        console.log('3. Reset MySQL root password if needed');
      }
      
      if (err.original?.code === 'ECONNREFUSED') {
        console.log('\n🔧 CONNECTION REFUSED - MySQL server is not running.');
        console.log('Solutions:');
        console.log('1. Start MySQL: net start mysql');
        console.log('2. Check Services.msc for MySQL service');
        console.log('3. Install MySQL if not installed');
      }
      
      if (err.original?.code === 'ER_BAD_DB_ERROR') {
        console.log('\n🔧 DATABASE NOT FOUND - Database does not exist.');
        console.log('Solutions:');
        console.log('1. Create database: CREATE DATABASE ecommerce_db;');
        console.log('2. Check database name in .env file');
      }
      
      process.exit(1);
    });
    
} catch (error) {
  console.error('❌ Module import failed:', error.message);
  process.exit(1);
}
