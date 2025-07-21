// Debug middleware to log all requests
const debugMiddleware = (req, res, next) => {
  console.log(`\n🔍 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', {
    'Content-Type': req.get('Content-Type'),
    'Authorization': req.get('Authorization') ? 'Bearer [PRESENT]' : 'Bearer [MISSING]',
    'User-Agent': req.get('User-Agent')
  });
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }
  
  // Log the response
  const originalSend = res.send;
  res.send = function(data) {
    console.log(`📤 Response Status: ${res.statusCode}`);
    if (res.statusCode >= 400) {
      console.log('Response Data:', data);
    }
    return originalSend.call(this, data);
  };
  
  next();
};

module.exports = debugMiddleware;
