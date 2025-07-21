const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'No token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Set req.user with the decoded token info
    req.user = { 
      userId: decoded.userId
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = auth;
