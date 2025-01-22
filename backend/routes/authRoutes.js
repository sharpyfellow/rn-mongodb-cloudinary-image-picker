const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfilePicture } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Get User Profile
router.get('/profile', authMiddleware, getUserProfile);

// Update Profile Picture
router.put('/upload-profile-picture', authMiddleware, updateUserProfilePicture);

module.exports = router;