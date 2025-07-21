const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables FIRST
dotenv.config();

// Now load database config after env vars are loaded
const { sequelize, connectDB } = require('./config/db');

const app = express();

// Connect to database
connectDB().then(success => {
  if (success) {
    console.log('✅ Database connection successful!');
  } else {
    console.log('❌ Database connection failed!');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Database connection error:', error);
  process.exit(1);
});

// Middlewares
app.use(cors());
app.use(express.json());

// Debug middleware (temporary)
app.use(require('./middleware/debugMiddleware'));

// Serve static files (images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/test', require('./routes/testRoutes'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🖼️  Static Files: http://localhost:${PORT}/uploads`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.log('🔧 Solutions:');
    console.log(`1. Kill existing process: taskkill /F /PID $(netstat -ano | findstr :${PORT})`);
    console.log('2. Use different port: PORT=5001 npm start');
    console.log('3. Wait a moment and try again');
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});
