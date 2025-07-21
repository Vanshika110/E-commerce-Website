// Simple test to verify authentication flow
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Test JWT creation and verification
const testUserId = 1;
const token = jwt.sign(
  { userId: testUserId },
  process.env.JWT_SECRET || 'fallback-secret',
  { expiresIn: '7d' }
);

console.log('Generated token:', token);

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
  console.log('Decoded token:', decoded);
  console.log('User ID from token:', decoded.userId);
} catch (error) {
  console.error('Token verification failed:', error.message);
}

// Test password hashing
const testPassword = 'testpassword123';
bcrypt.hash(testPassword, 10).then(hash => {
  console.log('Hashed password:', hash);
  
  bcrypt.compare(testPassword, hash).then(isMatch => {
    console.log('Password match:', isMatch);
  });
});
