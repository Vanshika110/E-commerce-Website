const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

// Test endpoint to check if server is running
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint to check uploads directory
router.get('/uploads-check', (req, res) => {
  const uploadsPath = path.join(__dirname, '../uploads');
  const profilesPath = path.join(uploadsPath, 'profiles');
  const productsPath = path.join(uploadsPath, 'products');
  
  const checks = {
    uploadsExists: fs.existsSync(uploadsPath),
    profilesExists: fs.existsSync(profilesPath),
    productsExists: fs.existsSync(productsPath),
    uploadFiles: fs.existsSync(uploadsPath) ? fs.readdirSync(uploadsPath, { withFileTypes: true }) : [],
    profileFiles: fs.existsSync(profilesPath) ? fs.readdirSync(profilesPath) : [],
    productFiles: fs.existsSync(productsPath) ? fs.readdirSync(productsPath) : []
  };
  
  res.json(checks);
});

module.exports = router;
