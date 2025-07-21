const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function testConnection() {
  console.log('🔍 Testing MySQL connection...');
  console.log('Config:');
  console.log('  Host:', process.env.DB_HOST);
  console.log('  User:', process.env.DB_USER);
  console.log('  Password:', process.env.DB_PASSWORD ? '***' : 'EMPTY');
  console.log('  Database:', process.env.DB_NAME);
  console.log('  Port:', process.env.DB_PORT);
  console.log('');

  // Test 1: Connection without database
  console.log('📋 Test 1: Connecting without database...');
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT
    });
    
    console.log('✅ MySQL server connection successful!');
    
    // Test 2: Check if database exists
    console.log('📋 Test 2: Checking if database exists...');
    const [rows] = await connection.execute('SHOW DATABASES LIKE ?', [process.env.DB_NAME]);
    
    if (rows.length === 0) {
      console.log('❌ Database does not exist. Creating...');
      await connection.execute(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log('✅ Database created successfully!');
    } else {
      console.log('✅ Database exists!');
    }
    
    // Test 3: Connect to specific database
    console.log('📋 Test 3: Connecting to specific database...');
    await connection.changeUser({
      database: process.env.DB_NAME
    });
    console.log('✅ Database connection successful!');
    
    // Test 4: Test permissions
    console.log('📋 Test 4: Testing permissions...');
    await connection.execute('SHOW TABLES');
    console.log('✅ Database permissions OK!');
    
    await connection.end();
    console.log('✅ All tests passed! Your MySQL setup is working correctly.');
    
  } catch (error) {
    console.error('❌ MySQL connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    
    console.log('\n🔧 Troubleshooting steps:');
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('ACCESS DENIED - Try these solutions:');
      console.log('1. Open MySQL Workbench and test connection');
      console.log('2. Check if your password is correct');
      console.log('3. Run: ALTER USER \'root\'@\'localhost\' IDENTIFIED WITH mysql_native_password BY \'root\';');
      console.log('4. Try with empty password: DB_PASSWORD=');
    }
    
    if (error.code === 'ECONNREFUSED') {
      console.log('CONNECTION REFUSED - MySQL server is not running:');
      console.log('1. Windows: net start mysql');
      console.log('2. Or start MySQL from Services (services.msc)');
      console.log('3. Check if running on port 3306: netstat -an | findstr :3306');
    }
    
    if (error.code === 'ENOTFOUND') {
      console.log('HOST NOT FOUND - Check hostname:');
      console.log('1. Make sure DB_HOST=localhost');
      console.log('2. Try DB_HOST=127.0.0.1');
    }
    
    console.log('\nCommon fixes:');
    console.log('- Restart MySQL service');
    console.log('- Check MySQL is installed and running');
    console.log('- Verify .env file settings');
    console.log('- Try connecting with MySQL Workbench first');
  }
}

console.log('🚀 MySQL Connection Test Starting...\n');
testConnection();
