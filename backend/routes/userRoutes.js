const express = require('express');
const { User } = require('../models');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get current user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: ['id', 'name', 'email', 'profileImage', 'createdAt']
    });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

// Update user profile
router.put('/me', auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if email is already taken by another user
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }
    }
    
    // Update user
    await user.update({
      name: name || user.name,
      email: email || user.email
    });
    
    // Return updated user without password
    const updatedUser = await User.findByPk(req.user.userId, {
      attributes: ['id', 'name', 'email', 'profileImage', 'createdAt']
    });
    
    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
