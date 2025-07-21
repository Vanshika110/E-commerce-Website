const { Sequelize } = require('sequelize');

// Debug environment variables
console.log('Database Config:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'EMPTY');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

const sequelize = new Sequelize(
  process.env.DB_NAME || 'ecommerce_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: parseInt(process.env.DB_PORT) || 3306,
    logging: console.log, // Enable logging to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 3
    }
  }
);

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MySQL...');
    await sequelize.authenticate();
    console.log('✅ MySQL Connected successfully.');
    
    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('✅ All models synchronized successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to MySQL database:');
    console.error('Error Code:', error.original?.code);
    console.error('Error Message:', error.message);
    
    if (error.original?.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n🔧 Access Denied Solutions:');
      console.log('1. Check username and password in .env file');
      console.log('2. Verify MySQL user permissions');
      console.log('3. Try: GRANT ALL PRIVILEGES ON *.* TO \'root\'@\'localhost\';');
    }
    
    if (error.original?.code === 'ECONNREFUSED') {
      console.log('\n🔧 Connection Refused Solutions:');
      console.log('1. Start MySQL service: net start mysql');
      console.log('2. Check if MySQL is running on port 3306');
      console.log('3. Verify MySQL server is installed');
    }
    
    if (error.original?.code === 'ER_BAD_DB_ERROR') {
      console.log('\n🔧 Database Not Found Solutions:');
      console.log('1. Create database: CREATE DATABASE ecommerce_db;');
      console.log('2. Check database name in .env file');
    }
    
    return false;
  }
};

module.exports = { sequelize, connectDB };
