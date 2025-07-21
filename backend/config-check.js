// Configuration Check Script
const fs = require('fs');
const path = require('path');

console.log('🔍 CONFIGURATION VERIFICATION\n');

// Check if .env file exists and has correct content
const envPath = path.join(__dirname, '.env');
console.log('1. Checking .env file...');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('✅ .env file exists');
  
  // Check required variables
  const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_PORT', 'JWT_SECRET'];
  const missingVars = [];
  
  requiredVars.forEach(varName => {
    if (!envContent.includes(varName)) {
      missingVars.push(varName);
    }
  });
  
  if (missingVars.length > 0) {
    console.log('❌ Missing variables:', missingVars);
  } else {
    console.log('✅ All required variables present');
  }
  
  console.log('\n📋 Current .env configuration:');
  console.log(envContent);
} else {
  console.log('❌ .env file not found');
}

// Check package.json dependencies
console.log('\n2. Checking package.json dependencies...');
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const deps = packageContent.dependencies || {};
  
  const requiredDeps = ['mysql2', 'sequelize', 'express', 'cors', 'dotenv', 'bcrypt', 'jsonwebtoken'];
  const missingDeps = [];
  
  requiredDeps.forEach(dep => {
    if (!deps[dep]) {
      missingDeps.push(dep);
    }
  });
  
  if (missingDeps.length > 0) {
    console.log('❌ Missing dependencies:', missingDeps);
  } else {
    console.log('✅ All required dependencies present');
  }
} else {
  console.log('❌ package.json not found');
}

// Check if required directories exist
console.log('\n3. Checking directory structure...');
const requiredDirs = [
  'config',
  'models',
  'controllers',
  'routes',
  'middleware',
  'uploads',
  'uploads/profiles',
  'uploads/products'
];

requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`✅ ${dir}/ exists`);
  } else {
    console.log(`❌ ${dir}/ missing`);
  }
});

// Check if required files exist
console.log('\n4. Checking required files...');
const requiredFiles = [
  'config/db.js',
  'models/index.js',
  'models/User.js',
  'models/Product.js',
  'models/Cart.js',
  'controllers/authController.js',
  'controllers/productController.js',
  'controllers/cartController.js',
  'routes/authRoutes.js',
  'routes/productRoutes.js',
  'routes/cartRoutes.js',
  'middleware/authMiddleware.js',
  'middleware/uploadMiddleware.js',
  'server.js'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.log(`❌ ${file} missing`);
  }
});

console.log('\n5. Configuration Summary:');
console.log('==========================');
console.log('✅ = Good | ❌ = Needs fixing');
console.log('');
console.log('Next steps if issues found:');
console.log('1. Fix any missing files/directories');
console.log('2. Install missing dependencies: npm install');
console.log('3. Test MySQL connection: node quick-test.js');
console.log('4. Start server: npm start');
