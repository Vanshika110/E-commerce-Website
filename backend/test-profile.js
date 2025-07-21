// Test profile endpoint
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

async function testProfileEndpoint() {
  try {
    console.log('🧪 Testing Profile Endpoint...\n');
    
    // 1. Test signup
    console.log('1. Testing signup...');
    const signupResponse = await axios.post(`${API_URL}/auth/signup`, testUser);
    console.log('✅ Signup successful:', signupResponse.data);
    
    const token = signupResponse.data.token;
    
    // 2. Test profile endpoint with token
    console.log('\n2. Testing profile endpoint...');
    const profileResponse = await axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Profile fetch successful:', profileResponse.data);
    
    // 3. Test users/me endpoint
    console.log('\n3. Testing users/me endpoint...');
    const usersMeResponse = await axios.get(`${API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Users/me fetch successful:', usersMeResponse.data);
    
    // 4. Test add to cart
    console.log('\n4. Testing add to cart...');
    const cartResponse = await axios.post(`${API_URL}/cart/add`, 
      { productId: 1, quantity: 1 }, 
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log('✅ Add to cart successful:', cartResponse.data);
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the test
testProfileEndpoint();
