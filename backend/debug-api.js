// Debug script to test API responses
const axios = require('axios');

async function testAPI() {
  try {
    console.log('🔍 Testing API endpoints...\n');
    
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:5000/api/test/health');
    console.log('✅ Health check:', healthResponse.data);
    
    // Test 2: Products endpoint
    console.log('\n2. Testing products endpoint...');
    const productsResponse = await axios.get('http://localhost:5000/api/products');
    console.log('✅ Products count:', productsResponse.data.length);
    
    if (productsResponse.data.length > 0) {
      console.log('📋 First product:');
      const firstProduct = productsResponse.data[0];
      console.log('  ID:', firstProduct.id);
      console.log('  Name:', firstProduct.name);
      console.log('  Image:', firstProduct.image);
      console.log('  Price:', firstProduct.price);
      
      // Test 3: Image URL
      console.log('\n3. Testing image URL...');
      try {
        const imageResponse = await axios.get(firstProduct.image);
        console.log('✅ Image URL is accessible:', imageResponse.status === 200);
      } catch (error) {
        console.log('❌ Image URL failed:', error.message);
      }
    }
    
    // Test 4: Static file serving
    console.log('\n4. Testing static file serving...');
    try {
      const staticResponse = await axios.get('http://localhost:5000/uploads/test.txt');
      console.log('✅ Static files accessible');
    } catch (error) {
      console.log('ℹ️ Static files test (expected to fail if no test file):', error.response?.status);
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testAPI();
